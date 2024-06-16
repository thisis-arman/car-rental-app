import { Schema, model } from "mongoose";

const carSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Car name is required"],
    },
    description: {
      type: String,
      required: [true, "Car description is required"],
    },
    color: {
      type: String,
      required: [true, "Car color is required"],
    },
    isElectric: {
      type: Boolean,
      required: [true, "Indication whether the car is electric is required"],
    },
    status: {
      type: String,
      enum: ["available", "unavailable"],
      default: "available",
    },
    features: {
      type: [String],
      required: [true, "Car features are required"],
    },
    pricePerHour: {
      type: Number,
      required: [true, "Car price per hour is required"],
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export const Car = model("Car", carSchema);
