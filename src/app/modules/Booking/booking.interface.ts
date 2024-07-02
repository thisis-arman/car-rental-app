import { Types } from "mongoose";

export type TBooking = {
  toObject(): any;
  date: string;
  user: Types.ObjectId;
  carId: Types.ObjectId;
  startTime: string;
  endTime: string;
  totalCost?: number;
};

