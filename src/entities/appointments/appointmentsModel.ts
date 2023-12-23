import mongoose, { Schema, Types } from "mongoose";

const appointmentsExtendedSchema = new Schema(
{
    customerId: { type: Types.ObjectId, ref: 'Users', maxlength: 24 },
    personalAssistantId: { type: Types.ObjectId, ref: 'Users', maxlength: 24 },
    phoneCustomer: { type: Number, maxlength: 9 },
    phonePersonalAssistant: { type: Number, maxlength: 9 },
    nameCustomer: { type: String, maxlength: 18 },
    namePersonalAssistant: { type: String, maxlength: 18 },
    date: Date,
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },
    isDeleted: {type: Boolean,default: false},

},
{
    versionKey: false,
    timestamps: true,
  });

export const appointmentsExtendedModel = mongoose.model(
    "Appointments",
    appointmentsExtendedSchema
);

export default appointmentsExtendedSchema;
