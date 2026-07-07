import mongoose from "mongoose";
import * as z from "zod";

export const createNoteSchema = z.object({
    title: z
        .string().trim()
        .min(1, "Title is required").max(100, "Title cannot exceed 100 characters"),

    category: z
        .string().trim()
        .min(1, "Category is required").max(50, "Category cannot exceed 50 characters"),

    content: z
        .string().trim()
        .min(1, "Content is required").max(5000, "Content cannot exceed 5000 characters"),
}).strict();

export const updateNoteSchema = createNoteSchema;

export const noteIdSchema = z.object({
    id: z.string().refine(
        (id) => mongoose.Types.ObjectId.isValid(id),
        {
            message: "Invalid note id",
        }
    ),
});