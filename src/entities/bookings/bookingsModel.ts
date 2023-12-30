import mongoose, { Schema, Types } from "mongoose";

const BookingsxtendedSchema = new Schema(
  { 
    date: Date,
    customerId: {type: Types.ObjectId, ref: 'Users', maxlength: 24 },
    destinationsId: { type: Types.ObjectId, ref: 'Destinations', maxlength: 24 },
    information: { type: String, maxlength:180},
    pay: { type: String, maxlength:30},
  },
  {
    versionKey: false,
    timestamps: true,
  });

export const bookingsExtendedModel = mongoose.model("Bookings", BookingsxtendedSchema);
export default BookingsxtendedSchema;

