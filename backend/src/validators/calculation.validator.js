import { z } from "zod";

const calculationSchema = z.object({

    facilityArea: z
        .number({
            error: "Facility area must be a number",
        })
        .positive("Facility area must be greater than 0"),

    gpuModel: z
        .string()
        .trim()
        .min(1, "GPU model is required"),

    gpuCount: z
        .number({
            error: "GPU count must be a number",
        })
        .int("GPU count must be an integer")
        .positive("GPU count must be greater than 0"),

    hoursUsed: z
        .number({
            error: "Hours used must be a number",
        })
        .positive("Hours used must be greater than 0"),

    renewableEnergyPercent: z
        .number({
            error: "Renewable energy must be a number",
        })
        .min(0, "Renewable energy cannot be below 0%")
        .max(100, "Renewable energy cannot exceed 100%"),

    pue: z
        .number({
            error: "PUE must be a number",
        })
        .gte(1, "PUE cannot be less than 1"),

    wue: z
        .number({
            error: "WUE must be a number",
        })
        .nonnegative("WUE cannot be negative"),
});
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

export const calculationSchemaValidator = validate(calculationSchema);