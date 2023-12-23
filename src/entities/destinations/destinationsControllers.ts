// destinationsControllers.ts
import { Request, Response } from "express";
import { destinationsExtendedModel } from "./destinationsModel";

export const createDestination = async (req: Request, res: Response) => {
  try {
    const { name, description } = req.body;


    const existingDestination = await destinationsExtendedModel.findOne({ name });

    if (existingDestination) {
      return res.status(400).json({ message: "Destination already exists." });
    }

    const newDestination = await destinationsExtendedModel.create({ name, description });

    return res.status(201).json({ message: "Destination created successfully.", newDestination });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
