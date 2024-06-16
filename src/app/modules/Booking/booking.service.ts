import { TBooking } from "./booking.interface";
import Booking from "./booking.model";

const createBookingIntoDB = async (payload: TBooking) => {
  const result = await Booking.create(payload);
  return result;
};

const getAllBookingsFromDB = async (query: Record<string, unknown>) => {
  const result = await Booking.find(query);
  return result;
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
  getSingleBookingFromDB,
  updateBookingFromDB,
  deleteBookingFromDB,
};
