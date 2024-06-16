
import express from 'express';
import { CarRoutes } from '../modules/Car/car.route';
import { UserRoutes } from '../modules/User/user.route';
import { BookingRoutes } from '../modules/Booking/booking.route';
import { AuthRoutes } from '../modules/auth/auth.route';


const router = express.Router()

const moduleRoutes = [
    {
        path: '/',
        route:UserRoutes
    },
     {
        path: '/cars',
        route:CarRoutes
    },
    {
        path: '/bookings',
        route:BookingRoutes
    },
    {
        path: "/auth",
        route:AuthRoutes
    }
]

moduleRoutes.map(route => router.use(route.path, route.route))

export default router;