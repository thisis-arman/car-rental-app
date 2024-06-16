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


export const carControllers = {
    addNewCar,
}