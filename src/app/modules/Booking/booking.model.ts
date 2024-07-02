// src/models/Booking.ts

import { Schema, model, Types } from "mongoose";
import { TBooking } from "./booking.interface";
import { number } from "zod";
import { TUser } from "../User/user.interface";

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


export interface PopulatedBooking extends Omit<TBooking, 'user'>  {
  user: TUser;
};


BookingSchema.post("save", async function (doc, next) {
  console.log(" from booking schema =>", await doc.populate("user"));
  const {user} = await doc.populate("user") as unknown as PopulatedBooking;
  console.log(user);
  user.password = "";
  next()
})
const Booking = model<TBooking>("Booking", BookingSchema);

export default Booking;
