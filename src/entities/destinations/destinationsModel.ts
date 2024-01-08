import mongoose, { Schema } from "mongoose";

const destinationsExtendedSchema = new Schema(
  {
    name: {
        type: String,
        enum: ["Palaos", "BoaVista", "Svalrgaror", "Casa"],
      },
    description: { type: String, maxlength:180},
    deleted: { type: Boolean, default: false },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export const destinationsExtendedModel = mongoose.model(
  "Destinations",
  destinationsExtendedSchema
);

export default destinationsExtendedSchema;
