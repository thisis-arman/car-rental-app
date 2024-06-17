"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authValidationSchema = void 0;
const zod_1 = __importDefault(require("zod"));
const loginSchema = zod_1.default.object({
    email: zod_1.default.string().email({ message: "Enter valid email address" }),
    password: zod_1.default.string()
});
exports.authValidationSchema = {
    loginSchema
};
