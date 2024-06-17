"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingValidation = void 0;
const zod_1 = require("zod");
const createBookingValidationSchema = zod_1.z.object({
    date: zod_1.z.string({ message: "Date is required" }),
    carId: zod_1.z.string(),
    startTime: zod_1.z.string().min(1, { message: "Start time is required" }),
});
exports.BookingValidation = {
    createBookingValidationSchema
};
