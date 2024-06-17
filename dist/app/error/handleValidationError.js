"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handleValidationError = (error) => {
    const errorOrigin = Object.values(error.errors).map((value) => {
        return {
            path: value === null || value === void 0 ? void 0 : value.path,
            message: value === null || value === void 0 ? void 0 : value.message
        };
    });
    const statusCode = 400;
    return {
        statusCode,
        message: "Validation error",
        errorOrigin
    };
};
exports.default = handleValidationError;
