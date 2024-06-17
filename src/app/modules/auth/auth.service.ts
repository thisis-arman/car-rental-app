import httpStatus from "http-status";
import config from "../../config";
import { TUser } from "../User/user.interface";
import { User } from "../User/user.model";
import { createToken } from "./auth.utils";
import AppError from "../../error/AppError";
import { TAuth } from "./auth.interface";

 
const loginUser = async (payload: TAuth) => {
  const user = await User.isUserExists(payload.email);

  if (!user) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      `this user ${payload.email} does not exist`
    );
  }

  const isDeleted = user.isDeleted;
  if (isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, `this User is already deleted`);
  }

 

  console.log("passwords", payload.password, user);

  const isPasswordMatched = await User.isPasswordMatched(
    payload.password,
    user.password
  );
  if (!isPasswordMatched) {
    throw new AppError(httpStatus.BAD_REQUEST, `Password does not match`);
  }

  const jwtPayload = {
    email: user.email,
    role: user.role,
  };
  console.log({jwtPayload});

  // Create access token

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_token as string,
    config.jwt_access_token_expires_in as string
  );
  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_token as string,
    config.jwt_refresh_token_expires_in as string
  );

  console.log({ accessToken });
  return {
    accessToken,
    refreshToken,
    user
  };
};


const changePassword = async (query: Record<string, unknown>) => {
  const result = await User.find(query);
  return result;
};
const refreshToken = async (query: Record<string, unknown>) => {
  const result = await User.find(query);
  return result;
};



export const authServices = {
  loginUser,
    changePassword,
  refreshToken

};
