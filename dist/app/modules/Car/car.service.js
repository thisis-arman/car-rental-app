"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CarServices = void 0;
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../error/AppError"));
const booking_model_1 = __importDefault(require("../Booking/booking.model"));
const car_model_1 = require("./car.model");
const addNewCarIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield car_model_1.Car.create(payload);
    return result;
});
const getAllCarsFromDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    query.isDeleted = false;
    const result = yield car_model_1.Car.find(query);
    console.log({ result });
    return result;
});
const getSingleCarFromDB = (_id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield car_model_1.Car.findById(_id);
    return result;
});
const updateCarFromDB = (_id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("26", { payload });
    const result = yield car_model_1.Car.findByIdAndUpdate(_id, payload, {
        new: true,
        runValidators: true,
    });
    return result;
});
const deleteCarFromDB = (_id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield car_model_1.Car.findByIdAndUpdate(_id, { isDeleted: true }, {
        new: true,
        runValidators: true,
    });
    return result;
});
const carReturnIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const booking = yield booking_model_1.default.findById(payload.bookingId)
        .populate("user")
        .populate({
        path: "carId",
        model: car_model_1.Car,
    });
    if (!booking) {
        throw new Error("Booking or carId is missing");
    }
    if (!booking.carId) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Car ID is missing");
    }
    const car = yield car_model_1.Car.findById(booking.carId);
    if (!car) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Car not found");
    }
    const [startHour, startMinute] = booking.startTime.split(":").map(Number);
    const [endHour, endMinute] = payload.endTime.split(":").map(Number);
    const startTimeInHours = startHour + startMinute / 60;
    const endTimeInHours = endHour + endMinute / 60;
    // Calculate duration in hours
    const durationInHours = endTimeInHours - startTimeInHours;
    if (durationInHours < 0) {
        throw new Error("End time must be after start time");
    }
    if (!booking.carId) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Car ID is missing");
    }
    const totalCost = durationInHours * ((_a = car.pricePerHour) !== null && _a !== void 0 ? _a : 0);
    booking.endTime = payload.endTime;
    booking.totalCost = totalCost;
    const updatedBooking = yield booking.save();
    yield car_model_1.Car.findByIdAndUpdate(booking.carId, { status: "available" });
    console.log({ updatedBooking });
    return updatedBooking;
});
exports.CarServices = {
    addNewCarIntoDB,
    getAllCarsFromDB,
    getSingleCarFromDB,
    updateCarFromDB,
    deleteCarFromDB,
    carReturnIntoDB,
};
