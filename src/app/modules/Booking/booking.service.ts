import { JwtPayload } from "jsonwebtoken";
import { TBooking } from "./booking.interface";
import Booking from "./booking.model";
import { User } from "../User/user.model";
import AppError from "../../error/AppError";
import httpStatus from "http-status";
import { Car } from "../Car/car.model";
import QueryBuilder from "../../builder/QueryBuilder";
import { BookingSearchableFields } from "./booking.constant";
import { TUser } from "../User/user.interface";
import { ObjectId } from "mongodb";

const createBookingIntoDB = async (payload: TBooking, decoded: JwtPayload) => {
  const bookingUser = await User.isUserExists(decoded.email);

  if (!bookingUser) {
    throw new AppError(httpStatus.UNAUTHORIZED, "Please login to book  a car");
  }

  // check the car is available or not

  const isCarAvailable = await Car.findById(payload.carId);
  if (isCarAvailable?.status === "unavailable") {
    throw new AppError(
      httpStatus.NOT_FOUND,
      "This car is not available at this moment"
    );
  }

  let userID = bookingUser._id as ObjectId;
  const newPayload = { ...payload, user: userID };
  // Create the booking
  const booking = await Booking.create(newPayload);

  await Car.findByIdAndUpdate(payload.carId, { status: "unavailable" });

  const result = await Booking.findById(booking._id)
    .populate("carId")
    .populate("user")
    .exec();

  // after booking successfully status will be unavailable

  return result;
};

const getAllBookingsFromDB = async (query: Record<string, unknown>) => {
  console.log({query});
  const bookingQuery = new QueryBuilder(Booking.find(), query)
    .search(BookingSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await bookingQuery.modelQuery;
  return result;
};

const getPersonalizedBookingsFromDB = async (decoded: JwtPayload) => {
  const bookings = await Booking.find().populate("user").populate("carId");

  const personalizedBooking = bookings.filter(
    (booking) =>( booking.user as Partial<TUser>)?.email  === decoded.email
  );

  return personalizedBooking;
};

const getSingleBookingFromDB = async (_id: string) => {
  const result = await Booking.findById(_id);
  return result;
};
const updateBookingFromDB = async (_id: string, payload: Partial<TBooking>) => {
  const result = await Booking.findByIdAndUpdate(_id, { payload });
  return result;
};
const deleteBookingFromDB = async (_id: string) => {
  const result = await Booking.findByIdAndUpdate(_id, { isDeleted: true });
  return result;
};

export const BookingServices = {
  createBookingIntoDB,
  getAllBookingsFromDB,
  getPersonalizedBookingsFromDB,
  getSingleBookingFromDB,
  updateBookingFromDB,
  deleteBookingFromDB,
};
