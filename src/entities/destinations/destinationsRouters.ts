import express, { Request, Response } from "express";
import * as DestinationsController from "./destinationsControllers";
import { authMiddleware } from "../../middleware/authMiddleware";

const router = express.Router();

router.post('/', authMiddleware, async (req: Request, res: Response) => {
  try {
    await DestinationsController.createDestination(req, res);
  } catch (error) {
    res.status(500).json({message: "Internal Server Error" });
  }
});



export default router;