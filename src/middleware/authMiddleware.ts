import CONF from "../core/config";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try { 
  
    if (!req.headers.authorization) {
      return res.status(401).json({
        message: "Unauthorized: Token missing.",
      });
    }

    const token = req.headers.authorization.split(" ")[1]; 
    const tokenDecoded = jwt.verify(token, CONF.SECRET) as any; 

    req.token = tokenDecoded;
    next();
  } catch (error) {
    return res.status(401).json({
      message: "Unauthorized: Invalid token.",
      error: error.message,
    });
  }
};