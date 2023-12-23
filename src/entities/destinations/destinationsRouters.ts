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

router.get('/', authMiddleware, async (_req, res) => {
    try {
      await DestinationsController.getAllDestinations(_req, res);
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  });

  router.get('/:id', authMiddleware, async (req, res) => {
    try {
      await DestinationsController.getDestinationById(req, res);
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  }); 

  router.put('/:id', authMiddleware, async (req, res) => {
    try {
      await DestinationsController.updateDestinationById(req, res);
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  });
  
export default router;