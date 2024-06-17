import Booking from "../Booking/booking.model";
import { TCar } from "./car.interface";
import { Car } from "./car.model";

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
console.log("26",{payload});
  const result = await Car.findByIdAndUpdate(_id, payload, {
    new: true,
    runValidators: true,
  });
  return result;
};

const deleteCarFromDB = async (_id: string) => {
  const result = await Car.findByIdAndUpdate(_id, { isDeleted: true }, {
    new: true,
    runValidators:true
  });
  return result;
};


const carReturnIntoDB = async (payload: {
  bookingId: string;
  endTime: string;
}) => {
  const booking = await Booking.findById(payload.bookingId).populate('user').populate("carId");

  if (!booking) {
    throw new Error("Booking not found");
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

  // Calculate total cost
  const totalCost = durationInHours * booking.carId.pricePerHour;

  booking.endTime = payload.endTime;
  booking.totalCost = totalCost;

  const updatedBooking = await booking.save();

  console.log({ updatedBooking });
  return updatedBooking;
};



export const CarServices = {
  addNewCarIntoDB,
  getAllCarsFromDB,
    getSingleCarFromDB,
    updateCarFromDB,
  deleteCarFromDB,
  carReturnIntoDB
};
