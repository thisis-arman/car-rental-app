import { TCar } from "./car.interface";
import { Car } from "./car.model";

const addNewCarIntoDB = async (payload: TCar) => {
  const result = await Car.create(payload);
  return result;
};

const getAllCarsFromDB = async (query: Record<string, unknown>) => {
  const result = await Car.find(query);
  return result;
};

const getSingleCarFromDB = async (_id: string) => {
  const result = await Car.findById(_id);
  return result;
};
const updateCarFromDB = async (_id: string,payload:Partial<TCar>) => {
  const result = await Car.findByIdAndUpdate(_id,{payload});
  return result;
};
const deleteCarFromDB = async (_id: string) => {
  const result = await Car.findByIdAndUpdate(_id,{isDeleted:true});
  return result;
};

export const CarServices = {
  addNewCarIntoDB,
  getAllCarsFromDB,
    getSingleCarFromDB,
    updateCarFromDB,
  deleteCarFromDB
};
