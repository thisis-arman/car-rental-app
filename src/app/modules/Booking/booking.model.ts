// src/models/Booking.ts

import { Schema, model, Types } from "mongoose";
import { TBooking } from "./booking.interface";
import { number } from "zod";

const BookingSchema = new Schema<TBooking>(
  {
    date: {
      type: Date,
      required: [true, "Date is required"],
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User ID is required"],
    },
    car: {
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
      required: [true, "End time is required"],
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
