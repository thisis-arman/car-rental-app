import express from "express";
import { validateRequest } from "../../middleware/validateRequest";
import { BookingValidation } from "./booking.validation";
import { bookingControllers } from "./booking.controller";

const router = express.Router();

router.post(
  "/",
  validateRequest(BookingValidation.createBookingValidationSchema),
  bookingControllers.createBooking
);

router.get("/", bookingControllers.getAllBookings);

router.get("/:id", bookingControllers.getSingleBooking);

router.delete("/:id", bookingControllers.deleteSingleBooking);

// TODO: update schema
router.put(
  "/:id",
  validateRequest(BookingValidation.createBookingValidationSchema),
  bookingControllers.updateSingleBooking
);

export const BookingRoutes = router;
