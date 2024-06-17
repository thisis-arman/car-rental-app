"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userValidations = void 0;
const zod_1 = require("zod");
const createUserValidationSchema = zod_1.z.object({
    name: zod_1.z.string().min(1, { message: "Name is required" }),
    email: zod_1.z
        .string()
        .email({ message: "Invalid email address" })
        .min(1, { message: "Email is required" }),
    role: zod_1.z.enum(["admin", "user"], { required_error: "Role is required" }),
    password: zod_1.z.string().min(4, { message: "Password is required" }),
    phone: zod_1.z.string().min(3, { message: "Phone number is required" }),
    address: zod_1.z.string().min(5, { message: "Address is required" }),
});
exports.userValidations = {
    createUserValidationSchema,
};
