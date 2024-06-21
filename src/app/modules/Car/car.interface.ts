import { Types } from "mongoose";


export type TCar = {
  _id: Types.ObjectId;
  name: string;
  description: string;
  color: string;
  isElectric: boolean;
  status: "available" | "unavailable";
  features: string[];
  pricePerHour: number;
  isDeleted: boolean;
};

