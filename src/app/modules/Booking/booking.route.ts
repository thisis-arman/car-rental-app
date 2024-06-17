import express from "express";
import { validateRequest } from "../../middleware/validateRequest";
import { BookingValidation } from "./booking.validation";
import { bookingControllers } from "./booking.controller";
import auth from "../../utils/auth";
import { USER_ROLE } from "../User/user.constant";

const router = express.Router();

router.post(
  "/",auth(USER_ROLE.user),
  validateRequest(BookingValidation.createBookingValidationSchema),
  bookingControllers.createBooking
);

router.get("/", bookingControllers.getAllBookings);

router.get("/", bookingControllers.getPersonalizedBookings);

router.get("/:id", auth(USER_ROLE.admin),bookingControllers.getSingleBooking);

router.delete("/:id", bookingControllers.deleteSingleBooking);

// TODO: Update Schema

router.put("/:id", validateRequest(BookingValidation.createBookingValidationSchema),
  bookingControllers.updateSingleBooking
);

export const BookingRoutes = router;
