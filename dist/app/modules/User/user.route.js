"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("./user.controller");
const validateRequest_1 = require("../../middleware/validateRequest");
const user_validation_1 = require("./user.validation");
const router = express_1.default.Router();
router.post('/auth/signup', (0, validateRequest_1.validateRequest)(user_validation_1.userValidations.createUserValidationSchema), user_controller_1.userController.createUser);
exports.UserRoutes = router;
