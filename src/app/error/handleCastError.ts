import mongoose from "mongoose";
import { TErrorSources, TGenericErrorResponse } from "../interface/error";

const handleCastError = (
  error: mongoose.Error.CastError
): TGenericErrorResponse => {
  const errorSources: TErrorSources = [
    {
      path: error.path,
      message: error.message,
    },
  ];

  let statusCode = 400;
  return {
    statusCode,
    message: "This is invalid ID",
    errorSources,
  };
};


export default handleCastError;