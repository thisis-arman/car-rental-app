import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { BookingServices } from "./booking.service";

const createBooking = catchAsync(async (req, res, next) => {
  const result = BookingServices.createBookingIntoDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: "Booking added successfully",
    success: true,
    data: result,
  });
});

const getAllBookings = catchAsync(async (req, res, next) => {
  const result = BookingServices.getAllBookingsFromDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Bookings are retrieved successfully",
    data: result,
  });
});

const getSingleBooking = catchAsync(async (req, res, next) => {
  const result = BookingServices.getSingleBookingFromDB(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Booking is retrieved successfully",
    data: result,
  });
});

const updateSingleBooking = catchAsync(async (req, res, next) => {
  const result = BookingServices.updateBookingFromDB(req.params.id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Booking is updated successfully",
    data: result,
  });
});

const deleteSingleBooking = catchAsync(async (req, res, next) => {
  const result = BookingServices.deleteBookingFromDB(req.params.id);
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
  getSingleBooking,
  updateSingleBooking,
  deleteSingleBooking,
};
