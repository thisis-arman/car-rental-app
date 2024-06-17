"use strict";
// src/models/Booking.ts
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const BookingSchema = new mongoose_1.Schema({
    date: {
        type: String,
        required: [true, "Date is required"],
    },
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
    },
    carId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Car",
        required: [true, "Car ID is required"],
    },
    startTime: {
        type: String,
        required: [true, "Start time is required"],
    },
    endTime: {
        type: String,
        default: null
    },
    totalCost: {
        type: Number,
        default: 0
    },
}, { timestamps: true });
const Booking = (0, mongoose_1.model)("Booking", BookingSchema);
exports.default = Booking;
