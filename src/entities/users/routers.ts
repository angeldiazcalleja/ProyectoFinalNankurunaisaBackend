import express, { Request, Response } from "express";
import * as UserController from "./controllers";
import { authMiddleware } from "../../middleware/authMiddleware";

const router = express.Router();


router.post("/login", async (req: Request, res: Response) => {
    try {
      await UserController.login(req, res);
    } catch (error) {
      res.status(500).json({
        message: "Internal Server Error",
      });
    }
  });

router.post("/", async (req: Request, res: Response) => {
  try {
    await UserController.register(req, res);
  } catch (error) {
    console.error("Error in UserController.register:", error);
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,  
    });
  }
});

export default router