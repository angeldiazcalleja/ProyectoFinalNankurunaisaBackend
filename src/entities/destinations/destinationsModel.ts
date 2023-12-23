import mongoose, { Schema } from "mongoose";

const destinationsExtendedSchema = new Schema(
  {
    name: {
        type: String,
        enum: ["Palaos", "BoaVista", "Svalrgaror"],
      },
    description: { type: String, maxlength:180},
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
