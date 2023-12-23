import express, { Request, Response } from "express";
import * as AppointmentController from "./appointmentsController";
import { authMiddleware } from "../../middleware/authMiddleware";

const router = express.Router();

router.post('/', authMiddleware, async (req: Request, res: Response) => {
  try {
    await AppointmentController.createAppointment(req, res);
  } catch (error) {
    res.status(500).json({message: "Internal Server Error" });
  }
});

router.get('/', authMiddleware, async (req: Request, res: Response) => {
  try {
    await AppointmentController.getAppointments(req, res);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});


export default router;
