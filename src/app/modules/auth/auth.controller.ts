import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { authServices } from "./auth.service";

const loginUser = catchAsync(async (req, res, next) => {
  const result = authServices.loginUser(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: "Car added successfully",
    success: true,
    data: result,
  });
});

const changePassword = catchAsync(async (req, res, next) => {
  const result = authServices.changePassword(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Cars are retrieved successfully",
    data: result,
  });
});





export const carControllers = {
  loginUser,
  changePassword,
};
