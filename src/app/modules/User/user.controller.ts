import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { userServices } from "./user.service";

const createUser = catchAsync(async (req, res, next) => {
  const result = userServices.createUserIntoDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User created successfully",
    data: result,
  });
});



const getAllUsers = catchAsync(async (req, res, next) => {
  const result = userServices.getAllUsersFromDB(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "All users are retrieved successfully",
    data: result,
  });
});



const getSingleUser = catchAsync(async (req, res, next) => {
  const result = userServices.getSingleUserFromDB(req.params.userId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "user is retrieved successfully",
    data: result,
  });
});



const updateSingleUser = catchAsync(async (req, res, next) => {
  const result = userServices.updateUserIntoDB(req.params.userId, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: " user is updated successfully",
    data: result,
  });
});
const deleteSingleUser = catchAsync(async (req, res, next) => {
  const result = userServices.deleteUserFromDB(req.params.userId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: " user is updated successfully",
    data: result,
  });
});

export const userController = {
  createUser,
  getAllUsers,
  getSingleUser,
  updateSingleUser,
  deleteSingleUser,
};
