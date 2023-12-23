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
      name, surname, email, phone, password: hashedPassword, role: 'admin',
    });
  
    const result = await newUser.save();
  
    return res.status(200).json({
      message: "User registered successfully.",
      userRegistered: result.toObject(),
    });
  };