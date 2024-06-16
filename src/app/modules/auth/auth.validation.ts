import z from 'zod'

const loginSchema = z.object({
    email: z.string().email({ message: "Enter valid email address" }),
    password: z.string()
})

export const authValidationSchema = {
    loginSchema
}