import { z } from "zod";

export const registerSchemaValidator = z.object({
    username: z
        .string()
        .trim()
        .min(3, "Username must contain at least 3 characters")
        .max(15, "Username cannot exceed 30 characters")
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


export const loginSchemaValidator = z.object({
    email: z
        .string()
        .trim()
        .email("Invalid email address")
        .transform((value) => value.toLowerCase()),

    password: z
        .string()
        .min(1, "Password is required"),
});