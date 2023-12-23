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
