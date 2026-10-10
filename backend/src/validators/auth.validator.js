
import { z } from "zod";

const registerSchema = z.object({
    username: z
        .string()
        .trim()
        .min(3, "Username must contain at least 3 characters")
        .max(15, "Username cannot exceed 15 characters")
        .regex(
            /^[a-zA-Z0-9_]+$/,
            "Username can only contain letters, numbers and underscore"
        ),

    email: z
        .string()
        .trim()
        .email("Invalid email address")
        .transform((value) => value.toLowerCase()),

    password: z
        .string()
        .min(8, "Password must contain at least 8 characters")
        .max(72, "Password cannot exceed 72 characters"),
});

const loginSchema = z.object({
    email: z
        .string()
        .trim()
        .email("Invalid email address")
        .transform((value) => value.toLowerCase()),

    password: z
        .string()
        .min(1, "Password is required"),
});

// Reusable Zod validation middleware
const validate = (schema) => (req, res, next) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
        return res.status(400).json({
            success: false,
            message: "Validation failed",
            errors: result.error.flatten(),
        });
    }

    req.body = result.data;
    next();
};

export const registerSchemaValidator = validate(registerSchema);
export const loginSchemaValidator = validate(loginSchema);