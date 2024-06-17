// src/models/Booking.ts

import { Schema, model, Types } from "mongoose";
import { TBooking } from "./booking.interface";
import { number } from "zod";

const BookingSchema = new Schema<TBooking>(
  {
    date: {
      type: String,
      required: [true, "Date is required"],
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    carId: {
      type: Schema.Types.ObjectId,
      ref: "Car",
      required: [true, "Car ID is required"],
    },
    startTime: {
      type: String,
      required: [true, "Start time is required"],
    },
    endTime: {
      type: String,
      default:null
    },
    totalCost: {
      type: Number,
      default:0
    },
   
  },
  { timestamps: true }
);

const Booking = model<TBooking>("Booking", BookingSchema);

export default Booking;
