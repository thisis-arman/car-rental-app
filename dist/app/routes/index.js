"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const car_route_1 = require("../modules/Car/car.route");
const user_route_1 = require("../modules/User/user.route");
const booking_route_1 = require("../modules/Booking/booking.route");
const auth_route_1 = require("../modules/auth/auth.route");
const router = express_1.default.Router();
const moduleRoutes = [
    {
        path: '/',
        route: user_route_1.UserRoutes
    },
    {
        path: '/cars',
        route: car_route_1.CarRoutes
    },
    {
        path: '/bookings',
        route: booking_route_1.BookingRoutes
    },
    {
        path: "/auth",
        route: auth_route_1.AuthRoutes
    }
];
moduleRoutes.map(route => router.use(route.path, route.route));
exports.default = router;
