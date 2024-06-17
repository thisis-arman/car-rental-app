"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handleCastError = (error) => {
    const errorOrigin = [
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
exports.default = handleCastError;
