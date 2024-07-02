import httpStatus from "http-status";
import AppError from "../../error/AppError";
import { TBooking } from "../Booking/booking.interface";
import Booking from "../Booking/booking.model";
import { TCar } from "./car.interface";
import { Car } from "./car.model";


export interface IBooking extends Document {
  // Other properties...
  carId:typeof Car | null; // Ensure this matches the actual relationship in your schema
}

const addNewCarIntoDB = async (payload: TCar) => {
  const result = await Car.create(payload);
  return result;
};

const getAllCarsFromDB = async (query: Record<string, unknown>) => {
  query.isDeleted = false;

  const result = await Car.find(query);
  console.log({ result });
  return result;
};

const getSingleCarFromDB = async (_id: string) => {
  const result = await Car.findById(_id);
  return result;
};


const updateCarFromDB = async (_id: string, payload: Partial<TCar>) => {
  console.log("26", { payload });
  const result = await Car.findByIdAndUpdate(_id, payload, {
    new: true,
    runValidators: true,
  });
  return result;
};


const deleteCarFromDB = async (_id: string) => {

  const isAlreadyDeleted = await Car.findById(_id);

  if (isAlreadyDeleted?.isDeleted) {
    throw new AppError(httpStatus.BAD_REQUEST,"Car already deleted")
  }

  const result = await Car.findByIdAndUpdate(
    _id,
    { isDeleted: true },
    {
      new: true,
      runValidators: true,
    }
  );
  return result;
};



const carReturnIntoDB = async (payload: {
  bookingId: string;
  endTime: string;
}) => {



  const booking = await Booking.findById(payload.bookingId)
    .populate("user")
    .populate({
      path: "carId",
      model: Car,
    });
 

if (!booking) {
  throw new Error("Booking or carId is missing");
  }
  
  if (!booking.carId) {
    throw new AppError(httpStatus.NOT_FOUND, "Car ID is missing");
  }

  const car = await Car.findById(booking.carId);

  if (!car) {
    throw new AppError(httpStatus.NOT_FOUND, "Car not found");
  }


  const [startHour, startMinute] = booking.startTime.split(":").map(Number);
  const [endHour, endMinute] = payload.endTime.split(":").map(Number);

  const startTimeInHours = startHour + startMinute / 60;
  const endTimeInHours = endHour + endMinute / 60;

  // Calculate duration in hours
  const durationInHours = endTimeInHours - startTimeInHours;

  if (durationInHours < 0) {
    throw new Error("End time must be after start time");
  }

  if (!booking.carId) {
    throw new AppError(httpStatus.NOT_FOUND,"Car ID is missing");
  }
 const totalCost = durationInHours * (car.pricePerHour ?? 0);



  booking.endTime = payload.endTime;
  booking.totalCost = totalCost;
  

  const updatedBooking = await booking.save();

  await Car.findByIdAndUpdate(booking.carId, { status: "available" });

  return updatedBooking;
};


export const CarServices = {
  addNewCarIntoDB,
  getAllCarsFromDB,
  getSingleCarFromDB,
  updateCarFromDB,
  deleteCarFromDB,
  carReturnIntoDB,
};
