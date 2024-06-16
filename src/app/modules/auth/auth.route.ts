

import express from 'express';
import { validateRequest } from '../../middleware/validateRequest';
import { authValidationSchema } from './auth.validation';
import { authControllers } from './auth.controller';

const router = express.Router();

router.post(
  "/signin",
  validateRequest(authValidationSchema.loginSchema),
  authControllers.loginUser
);


router.post(
  "/change-password",
  validateRequest(authValidationSchema.loginSchema),
  authControllers.changePassword
);


export const AuthRoutes = router;