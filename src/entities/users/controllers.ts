import { Request, Response } from "express";
import { userExtendedModel } from "./model";
import {
  handleBadRequest,
  handleNotFound,
  handleUnauthorized,
} from "../../core/errorHandlers";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import CONF from "../../core/config";
import { Types } from "mongoose";

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await userExtendedModel.findOne({ email }).select("+password");

    if (user) {
      if (await bcrypt.compare(password, user.password)) {
        const token = jwt.sign({ name: user.name, phone: user.phone, _id: user._id, email, role: user.role }, CONF.SECRET, {
          expiresIn: "24h",
        });
        res.json({ token });
      } else {
        res.status(401).json({ error: "User not found or invalid credentials" });  
      } 
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

export const register = async (req: Request, res: Response) => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,16}$/;
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  
    const { name, surname, email, phone, role, password } = req.body;
    const requestingUserRole = req.token?.role;
  
    if (!email || !password) {
      return handleBadRequest(res);
    }
  
    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        message: "Password does not meet the requirements. It must be between 8 and 16 characters, contain at least one uppercase letter, one digit, and one special character.",
      });
    }
  
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        message: "Invalid email address format.",
      });
    }
  
    const userFound = await userExtendedModel.findOne({ email });
  
    if (userFound) {
      return res.status(409).json({
        message: "A user is already registered with that email address.",
      });
    }
  
    const hashedPassword = bcrypt.hashSync(password, CONF.HASH_ROUNDS);
  
    const newUser = new userExtendedModel({
      name, surname, email, phone, role, password: hashedPassword,
    });
  
    const result = await newUser.save();
  
    return res.status(200).json({
      message: "User registered successfully.",
      userRegistered: result.toObject(),
    });
  };

  export const findUsers = async (req: Request, res: Response) => {
    const requestingUserRole = req.token?.role;
  
    if (requestingUserRole !== 'admin') {
      return handleUnauthorized(res);
    }
  
    const { page = 1, limit = 10, sort, search, role} = req.query;
    const skip = (Number(page) - 1) * Number(limit);
  
    try {
      let query = userExtendedModel.find();
      const users = await query.skip(skip).limit(parseInt(limit as string, 10));
  
      if (role && typeof role === 'string') {
        query = query.where({ role });
      }
  
      if (sort === 'ASC') {
        query = query.sort({ name: 1 });
      } else if (sort === 'DSC') {
        query = query.sort({ name: -1 });
      }
  
      if (search && typeof search === 'string') {
        query = query.find({
          $or: [
            { name: { $regex: new RegExp(search, 'i') } },
            { email: { $regex: new RegExp(search, 'i') } },
          ],
        });
      }
  
      return res.status(200).json(users);
    } catch (error) {
      console.error('Error fetching users:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  export const findUser = async (req: Request, res: Response) => {
    const { _id } = req.params;
    const requestingUserId = req.token?._id;
    const requestingUserRole = req.token?.role; 
  
    const user = await userExtendedModel.findOne({
      _id: _id,
      isDeleted: false,
    });
  
    if (user) {
      if (requestingUserRole === "admin" || (requestingUserRole === "customer" && user._id.toString() === requestingUserId)) {
        return res.status(200).json(user);
      } else {
        return handleUnauthorized(res);
      }
    } else {
      return handleNotFound(res);
    }
  };

  export const modifyUser = async (req: Request, res: Response) => {
    const { _id } = req.params;
    const { name, surname, email, phone, role, password } = req.body;
    const userIdFromToken = req.token?._id;
    const roleIdFromToken = req.token?.role;
  
    const user = await userExtendedModel.findOne({ _id: new Types.ObjectId(_id) });
  
    const unauthorizedMessage = "You do not have permission to modify this account.";
    if (!user || (roleIdFromToken === 'customer' && userIdFromToken !== user._id.toString()) || (roleIdFromToken !== 'admin' && userIdFromToken !== user._id.toString())) {
      return res.status(403).json({
        message: unauthorizedMessage,
        details: "Additional details about why the request is unauthorized.",
  
      });
    }
  
    if (name) user.name = name;
    if (surname) user.surname = surname;
    if (email) user.email = email;
    if (phone) user.phone = phone;
    if (role) user.role = role;
  
    if (password) {
      const hashedPassword = bcrypt.hashSync(password, CONF.HASH_ROUNDS);
      user.password = hashedPassword;
    }
  
    if (roleIdFromToken === 'admin' && role) {
      user.role = role;
    }
  
    const result = await user.save();
  
    return res.status(200).json(result)
  };

  export const deleteUser = async (req: Request, res: Response) => {
    const { _id } = req.params;
    const userIdFromToken = req.token?._id?.toString();
  
    const { ObjectId } = Types;
    const objectId = new ObjectId(_id); 
  
    if (
      userIdFromToken &&
      req.token?.role === "customer" &&
      userIdFromToken !== _id
    ) {
      return res.status(403).json({
        message: "You do not have permission to delete this account.",
      });
    }
  
    if (req.token?.role === "admin") {
      const result = await userExtendedModel.updateOne(
        { _id: objectId },
        { isDeleted: true }
      );
  
      return result.modifiedCount === 1
        ? res.status(200).json(result)
        : handleNotFound(res);
    }
  
    const result = await userExtendedModel.updateOne(
      { _id: objectId },
      { isDeleted: true }
    );
  
    return result.modifiedCount === 1
      ? res.status(200).json(result)
      : handleNotFound(res);
  };


