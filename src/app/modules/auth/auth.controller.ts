import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { authServices } from "./auth.service";

const loginUser = catchAsync(async (req, res, next) => {
  const {newUser,accessToken} =await authServices.loginUser(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: "User logged in successfully",
    success: true,
    data: {
      user:newUser,
      token: accessToken
    },
  });
});



const changePassword = catchAsync(async (req, res, next) => {
  const result = await authServices.changePassword(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Cars are retrieved successfully",
    data: result,
  });
});





export const authControllers = {
  loginUser,
  changePassword,
};
