
import express from 'express';

const router = express.Router()

const moduleRoutes = [
    {
        path: '/users',
        route:"uer"

    }
]

moduleRoutes.map(route => router.use(route.path, route.route))

export default router;