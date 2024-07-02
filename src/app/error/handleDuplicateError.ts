import { TErrorOrigin, TGenericErrorResponse } from "../interface/error";

const handleDuplicateError = (error: any): TGenericErrorResponse => {
  // to get the error message
  const match = error.message.match(/"([^"]*)"/);

  const retrievedMessage = match && match[1];

  const errorOrigin: TErrorOrigin = [
    {
      path: "",
      message: `${retrievedMessage} is already exists`,
    },
  ];

  const statusCode = 400;
  return {
    statusCode,
    message: "Duplicate Entry",
    errorOrigin,
  };
};

export default handleDuplicateError;