import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { BookingServices } from "./booking.service";
import jwt, { JwtPayload } from 'jsonwebtoken'
import config from "../../config";
import { User } from "../User/user.model";
import Booking from "./booking.model";

const createBooking = catchAsync(async (req, res, next) => {

  const token = req.headers.authorization;


    const decoded = jwt.verify(
      token as string,
      config.jwt_access_token as string
  ) as JwtPayload;

  const booking = await BookingServices.createBookingIntoDB(req.body,decoded);

 

  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: "Booking added successfully",
    success: true,
    data: booking,
  });
});

const getAllBookings = catchAsync(async (req, res, next) => {
  const result = await BookingServices.getAllBookingsFromDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Bookings are retrieved successfully",
    data: result,
  });
});


// TODO : decode token to find out email for personalized bookings

const getPersonalizedBookings = catchAsync(async (req, res, next) => {
  const result = await BookingServices.getAllBookingsFromDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Bookings are retrieved successfully",
    data: result,
  });
});

const getSingleBooking = catchAsync(async (req, res, next) => {
  const result = await BookingServices.getSingleBookingFromDB(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Booking is retrieved successfully",
    data: result,
  });
});

const updateSingleBooking = catchAsync(async (req, res, next) => {
  const result = await BookingServices.updateBookingFromDB(
    req.params.id,
    req.body
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Booking is updated successfully",
    data: result,
  });
});

const deleteSingleBooking = catchAsync(async (req, res, next) => {
  const result = await BookingServices.deleteBookingFromDB(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Booking is Removed successfully",
    data: result,
  });
});

export const bookingControllers = {
  createBooking,
  getAllBookings,
  getPersonalizedBookings,
  getSingleBooking,
  updateSingleBooking,
  deleteSingleBooking,
};
