import { z } from "zod";

const createBookingValidationSchema = z.object({
  date: z.date({ message: "Date is required" }),
  user: z.string(),
  car: z.string(),
  startTime: z.string().min(1, { message: "Start time is required" }),
  endTime: z.string().min(1, { message: "End time is required" }),
  totalCost: z.number().default(0).optional(),
});

export const BookingValidation = {
    createBookingValidationSchema
}