import { ZodError } from "zod";
import { TErrorOrigin, TGenericErrorResponse } from "./../interface/error";

const handleZodError = (error: ZodError): TGenericErrorResponse => {
  const errorOrigin: TErrorOrigin = error.issues.map((issue) => {
    return {
      path: issue.path[issue.path.length - 1],
      message: issue.message,
    };
  });
  const statusCode = 400;

  return {
    statusCode,
    message: "ZOD VALIDATION ERROR",
    errorOrigin,
  };
};

export default handleZodError;
