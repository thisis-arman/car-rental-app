import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { CarServices } from "./car.service";

const addNewCar = catchAsync(async (req, res, next) => {
  const result = await CarServices.addNewCarIntoDB(req.body);
  console.log({ result });
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: "Car added successfully",
    success: true,
    data: result,
  });
});

const getAllCars = catchAsync(async (req, res, next) => {
  const result = await CarServices.getAllCarsFromDB(req.query);
  console.log({ result });
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Cars are retrieved successfully",
    data: result,
  });
});

const getSingleCar = catchAsync(async (req, res, next) => {
  const result = await CarServices.getSingleCarFromDB(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Car is retrieved successfully",
    data: result,
  });
});

const updateSingleCar = catchAsync(async (req, res, next) => {
  const result = await CarServices.updateCarFromDB(req.params.id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Car is updated successfully",
    data: result,
  });
});

const deleteSingleCar = catchAsync(async (req, res, next) => {
  const result = await CarServices.deleteCarFromDB(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Car is deleted successfully",
    data: result,
  });
});



const carReturn = catchAsync(async (req, res, next) => {


  const result = await CarServices.carReturnIntoDB(req.body);



  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Car Returned Successfully",
    data: result,
  });
});

export const carControllers = {
  addNewCar,
  getAllCars,
  getSingleCar,
  updateSingleCar,
  deleteSingleCar,
  carReturn,
};
