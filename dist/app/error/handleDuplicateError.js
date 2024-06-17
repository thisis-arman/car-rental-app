"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handleDuplicateError = (error) => {
    // to get the error message
    const match = error.message.match(/"([^"]*)"/);
    const retrievedMessage = match && match[1];
    const errorOrigin = [
        {
            path: "",
            message: `${retrievedMessage} is already exists`,
        },
    ];
    const statusCode = 400;
    return {
        statusCode,
        message: "this is invalid ID",
        errorOrigin,
    };
};
exports.default = handleDuplicateError;
