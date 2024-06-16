
import express from 'express';
import { CarRoutes } from '../modules/Car/car.route';

const router = express.Router()

const moduleRoutes = [
     {
        path: '/cars',
        route:CarRoutes
    }
]

moduleRoutes.map(route => router.use(route.path, route.route))

export default router;