import mongoose from "mongoose";
import { TErrorOrigin, TGenericErrorResponse } from "../interface/error";

const handleCastError = (
  error: mongoose.Error.CastError
): TGenericErrorResponse => {
  const errorOrigin: TErrorOrigin = [
    {
      path: error.path,
      message: error.message,
    },
  ];

  let statusCode = 400;
  return {
    statusCode,
    message: "This is invalid ID",
    errorOrigin,
  };
};


export default handleCastError;