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
exports.BookingServices = void 0;
const booking_model_1 = __importDefault(require("./booking.model"));
const user_model_1 = require("../User/user.model");
const AppError_1 = __importDefault(require("../../error/AppError"));
const http_status_1 = __importDefault(require("http-status"));
const car_model_1 = require("../Car/car.model");
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const booking_constant_1 = require("./booking.constant");
const createBookingIntoDB = (payload, decoded) => __awaiter(void 0, void 0, void 0, function* () {
    const bookingUser = yield user_model_1.User.isUserExists(decoded.email);
    if (!bookingUser) {
        throw new AppError_1.default(http_status_1.default.UNAUTHORIZED, "Please login to book  a car");
    }
    // check the car is available or not
    const isCarAvailable = yield car_model_1.Car.findById(payload.carId);
    if ((isCarAvailable === null || isCarAvailable === void 0 ? void 0 : isCarAvailable.status) === "unavailable") {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "This car is not available at this moment");
    }
    let userID = bookingUser._id;
    const newPayload = Object.assign(Object.assign({}, payload), { user: userID });
    // Create the booking
    const booking = yield booking_model_1.default.create(newPayload);
    yield car_model_1.Car.findByIdAndUpdate(payload.carId, { status: "unavailable" });
    const result = yield booking_model_1.default.findById(booking._id)
        .populate("carId")
        .populate("user")
        .exec();
    // after booking successfully status will be unavailable
    return result;
});
const getAllBookingsFromDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    console.log({ query });
    const bookingQuery = new QueryBuilder_1.default(booking_model_1.default.find(), query)
        .search(booking_constant_1.BookingSearchableFields)
        .filter()
        .sort()
        .paginate()
        .fields();
    const result = yield bookingQuery.modelQuery;
    return result;
});
const getPersonalizedBookingsFromDB = (decoded) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield booking_model_1.default.find().populate("user").populate("carId");
    const personalizedBooking = result.filter((booking) => { var _a; return ((_a = booking.user) === null || _a === void 0 ? void 0 : _a.email) === decoded.email; });
    return personalizedBooking;
});
const getSingleBookingFromDB = (_id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield booking_model_1.default.findById(_id);
    return result;
});
const updateBookingFromDB = (_id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield booking_model_1.default.findByIdAndUpdate(_id, { payload });
    return result;
});
const deleteBookingFromDB = (_id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield booking_model_1.default.findByIdAndUpdate(_id, { isDeleted: true });
    return result;
});
exports.BookingServices = {
    createBookingIntoDB,
    getAllBookingsFromDB,
    getPersonalizedBookingsFromDB,
    getSingleBookingFromDB,
    updateBookingFromDB,
    deleteBookingFromDB,
};
