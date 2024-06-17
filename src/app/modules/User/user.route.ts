
import express from 'express';
import { userController } from './user.controller';
import { validateRequest } from '../../middleware/validateRequest';
import { userValidations } from './user.validation';

const router = express.Router();


router.post('/auth/signup', validateRequest(userValidations.createUserValidationSchema), userController.createUser)


export const UserRoutes = router;