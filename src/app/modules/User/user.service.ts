import httpStatus from "http-status";
import QueryBuilder from "../../builder/QueryBuilder";
import AppError from "../../error/AppError";
import { userSearchableFields } from "./user.constant";
import { TUser } from "./user.interface";
import { User } from "./user.model";
import mongoose from "mongoose";


const createUserIntoDB = async (payload: TUser) => {
  const isUserExists = await User.isUserExists(payload.email);
  if (isUserExists) {
    throw new AppError(httpStatus.BAD_REQUEST, "User already exists");
  }

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    const user = await User.create([payload], { session });
    if (!user.length) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to create user");
    }

    await session.commitTransaction();
    await session.endSession();

    return user;
  } catch (error:any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(error);
  }
};

const getAllUsersFromDB = async (query: Record<string, unknown>) => {
  const userQuery = new QueryBuilder(User.find(), query)
    .search(userSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();
  const user = await userQuery.modelQuery;
  return user;
};

const getSingleUserFromDB = async (_id: string) => {
  const user = await User.findById(_id);
  return user;
};

const updateUserIntoDB = async (_id: string, payload: Partial<TUser>) => {
  const user = await User.findByIdAndUpdate(
    _id,
    {
      payload,
    },
    {
      $upsert: true,
      runValidators: true,
      new: true,
    }
  );
  return user;
};


const deleteUserFromDB = async (_id: string) => {
  const deletedUser = await User.findByIdAndUpdate(_id, {
    isDeleted: true,
  });

  return deletedUser;
};

export const userServices = {
  createUserIntoDB,
  getAllUsersFromDB,
  getSingleUserFromDB,
  updateUserIntoDB,
  deleteUserFromDB,
};
