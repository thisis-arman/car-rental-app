import { z } from "zod";

const createUserValidationSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z
    .string()
    .email({ message: "Invalid email address" })
    .min(1, { message: "Email is required" }),
  role: z.enum(["admin", "user"], { required_error: "Role is required" }),
  password: z.string().min(4, { message: "Password is required" }),
  phone: z.string().min(3, { message: "Phone number is required" }),
  address: z.string().min(5, { message: "Address is required" }),
});

export const userValidations = {
  createUserValidationSchema,
};
