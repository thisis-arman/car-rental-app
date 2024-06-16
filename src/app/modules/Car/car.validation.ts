const { z } = require("zod");

const createCarValidationSchema = z.object({
  name: z.string().min(1, { message: "Car name is required" }),
  description: z.string().min(20, { message: "Car description is required" }),
  color: z.string().min(1, { message: "Car color is required" }),
  isElectric: z.boolean({
    required_error: "Indication whether the car is electric is required",
  }),
  status: z.enum(["available", "unavailable"]).default("available"),
  features: z.array(z.string(), {
    required_error: "Car features are required",
  }),

  isDeleted: z.boolean().default(false),
});



const updateCarValidationSchema = z
  .object({
    name: z.string().min(1, { message: "Car name is required" }).optional(),
    description: z
      .string()
      .min(20, { message: "Car description is required" })
      .optional(),
    color: z.string().min(1, { message: "Car color is required" }).optional(),
    isElectric: z
      .boolean({
        required_error: "Indication whether the car is electric is required",
      })
      .optional(),
    status: z.enum(["available", "unavailable"]).optional(),
    features: z
      .array(z.string(), {
        required_error: "Car features are required",
      })
      .optional(),
    isDeleted: z.boolean().optional(),
  })
  .partial();

export const carValidations = {
  createCarValidationSchema,
  updateCarValidationSchema,
};
