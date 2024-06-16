
import express from 'express';
import { CarRoutes } from '../modules/Car/car.route';
import { UserRoutes } from '../modules/User/user.route';

const router = express.Router()

const moduleRoutes = [
    {
        path: '/users',
        route:UserRoutes
    },
     {
        path: '/cars',
        route:CarRoutes
    }
]

moduleRoutes.map(route => router.use(route.path, route.route))

export default router;