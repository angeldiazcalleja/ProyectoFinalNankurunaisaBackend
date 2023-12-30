import express, { Request, Response } from "express";
import * as BookingController from "./bookingsControllers";
import { authMiddleware } from "../../middleware/authMiddleware";


const router = express.Router();

router.post('/', authMiddleware, async (req: Request, res: Response) => {
  try {
    await BookingController.createBooking(req, res);
  } catch (error) {
    res.status(500).json({message: "Internal Server Error" });
  }
});

router.get('/', authMiddleware, async (req, res) => {
  try {
    await BookingController.getAllBookings(req, res);
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


export default router