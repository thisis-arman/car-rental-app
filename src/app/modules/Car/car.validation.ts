const { z } = require("zod");

const createCarValidationSchema = z.object({
  carData: z.object({
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
  }),
});

export const carValidations = {
  createCarValidationSchema,
};