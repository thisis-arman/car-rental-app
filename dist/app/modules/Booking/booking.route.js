"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = require("../../middleware/validateRequest");
const booking_validation_1 = require("./booking.validation");
const booking_controller_1 = require("./booking.controller");
const auth_1 = __importDefault(require("../../utils/auth"));
const user_constant_1 = require("../User/user.constant");
const router = express_1.default.Router();
router.post("/", (0, auth_1.default)(user_constant_1.USER_ROLE.user), (0, validateRequest_1.validateRequest)(booking_validation_1.BookingValidation.createBookingValidationSchema), booking_controller_1.bookingControllers.createBooking);
router.get("/", (0, auth_1.default)(user_constant_1.USER_ROLE.admin), booking_controller_1.bookingControllers.getAllBookings);
router.get("/my-bookings", (0, auth_1.default)(user_constant_1.USER_ROLE.user), booking_controller_1.bookingControllers.getPersonalizedBookings);
router.get("/:id", (0, auth_1.default)(user_constant_1.USER_ROLE.admin), booking_controller_1.bookingControllers.getSingleBooking);
router.delete("/:id", booking_controller_1.bookingControllers.deleteSingleBooking);
// TODO: Update Schema
router.put("/:id", (0, validateRequest_1.validateRequest)(booking_validation_1.BookingValidation.createBookingValidationSchema), booking_controller_1.bookingControllers.updateSingleBooking);
exports.BookingRoutes = router;
