import * as z from "zod";

const passwordMin = 6, passwordMax = 128;
const nameMin = 2, nameMax = 50;

export const registerUserSchema = z.object({
    name: z.string().trim().min(nameMin).max(nameMax),

    email: z.string().trim().email(),

    password: z.string().min(passwordMin).max(passwordMax),

    pic: z.string().url().optional(),
}).strict();

export const loginUserSchema = z.object({
    email: z.string().trim().email(),
    password: z.string().min(passwordMin).max(passwordMax)
}).strict();

export const updateProfileSchema = z.object({
    name: z.string().trim().min(nameMin).max(nameMax).optional(),

    email: z.string().trim().email().optional(),

    password: z.string().min(passwordMin).max(passwordMax).optional(),

    pic: z.string().url().optional(),
}).strict();