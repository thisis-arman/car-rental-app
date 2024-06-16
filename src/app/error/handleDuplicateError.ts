import { TErrorSources, TGenericErrorResponse } from "../interface/error";

const handleDuplicateError = (error: any): TGenericErrorResponse => {
  // to get the error message
  const match = error.message.match(/"([^"]*)"/);

  const retrievedMessage = match && match[1];

  const errorSources: TErrorSources = [
    {
      path: "",
      message: `${retrievedMessage} is already exists`,
    },
  ];

  const statusCode = 400;
  return {
    statusCode,
    message: "this is invalid ID",
    errorSources,
  };
};
