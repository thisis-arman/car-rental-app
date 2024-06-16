import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { CarServices } from "./car.service";

const addNewCar = catchAsync(async (req, res, next) => {
  const result = CarServices.addNewCarIntoDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: "Car added successfully",
    success: true,
    data: result,
  });
});

const getAllCars = catchAsync(async (req, res, next) => {
  const result = CarServices.getAllCarsFromDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Cars are retrieved successfully",
    data: result,
  });
});

const getSingleCar = catchAsync(async (req, res, next) => {
  const result = CarServices.getSingleCarFromDB(req.params.carId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Car is retrieved successfully",
    data: result,
  });
});

const updateSingleCar = catchAsync(async (req, res, next) => {
  const result = CarServices.updateCarFromDB(req.params.carId, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Car is updated successfully",
    data: result,
  });
});


const deleteSingleCar = catchAsync(async (req, res, next) => {
  const result = CarServices.deleteCarFromDB(req.params.carId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Car is deleted successfully",
    data: result,
  });
});

export const carControllers = {
  addNewCar,
  getAllCars,
  getSingleCar,
    updateSingleCar,
  deleteSingleCar
};
