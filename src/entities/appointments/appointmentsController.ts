import { Request, Response } from "express";
import { appointmentsExtendedModel } from "./appointmentsModel";
import { userExtendedModel } from "../users/model";
import { handleNotFound } from "../../core/errorHandlers";

export const createAppointment = async (req: Request, res: Response) => {
  const { customerId, personalAssistantId, date, startTime, endTime} =
    req.body;

  const currentDate = new Date();
  if (new Date(date) < currentDate) {
    return res.status(400).json({
      message: "Invalid date. Please choose a date in the future.",
    });
  }

  const { role: userRole, _id: userId } = req.token;

  if (userRole === "customer" && userId !== customerId) {
    return res.status(403).json({
      message:
        "You don't have permission to create appointments for other customers.",
    });
  }

  if (userRole === "personalAssistant" && userId !== personalAssistantId) {
    return res.status(403).json({
      message:
        "You don't have permission to create appointments for other personalAssistant.",
    });
  }
  const customerAppointmentFound = await appointmentsExtendedModel.findOne({
    customerId,
    date,
    $or: [
      {
        $and: [
          { startTime: { $gte: startTime } },
          { startTime: { $lt: endTime } },
        ],
      },
      {
        $and: [{ endTime: { $gt: startTime } }, { endTime: { $lte: endTime } }],
      },
    ],
  });

  if (customerAppointmentFound) {
    return res.status(400).json({
      message:
        "Invalid date and time. Customer already has another appointment.",
    });
  }

  const personalAssistantAppointmentFound = await appointmentsExtendedModel.findOne({
    personalAssistantId,
    date,
    $or: [
      {
        $and: [
          { startTime: { $gte: startTime } },
          { startTime: { $lt: endTime } },
        ],
      },
      {
        $and: [{ endTime: { $gt: startTime } }, { endTime: { $lte: endTime } }],
      },
    ],
  });

  if (personalAssistantAppointmentFound) {
    return res.status(400).json({
      message:
        "Invalid date and time. Tattoo artist already has another appointment.",
    });
  }

  const customerDetails = await userExtendedModel.findById(customerId);
  const personalAssistantDetails = await userExtendedModel.findById(personalAssistantId);

  const newAppointment = new appointmentsExtendedModel({
    customerId,
    personalAssistantId,
    date,
    startTime,
    endTime,
    nameCustomer: customerDetails.name,
    namePersonalAssistant: personalAssistantDetails.name,
    phoneCustomer: customerDetails.phone,
    phonePersonalAssistant: personalAssistantDetails.phone,
  });
  const savedAppointment = await newAppointment.save();



  return res.status(200).json({
    message: "Appointment generated successfully",
    newAppointment: savedAppointment.toObject(),
  });
};