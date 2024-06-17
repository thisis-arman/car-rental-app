import { z } from "zod";

const createBookingValidationSchema = z.object({
  date: z.string({ message: "Date is required" }),
  carId: z.string(),
  startTime: z.string().min(1, { message: "Start time is required" }),
});

export const BookingValidation = {
    createBookingValidationSchema
}