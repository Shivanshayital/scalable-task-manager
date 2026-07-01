import { z } from "zod";

export const createTaskSchema = z.object({
  title: z.string().trim().min(3, "Title must be at least 3 characters"),
  description: z.string().trim().min(5, "Description must be at least 5 characters"),
});

export const updateTaskSchema = z
  .object({
    title: z.string().trim().min(3, "Title must be at least 3 characters").optional(),
    description: z.string().trim().min(5, "Description must be at least 5 characters").optional(),
  })
  .refine((data) => data.title !== undefined || data.description !== undefined, {
    message: "At least one field must be provided",
  });

export type CreateTaskInput = z.infer<typeof createTaskSchema>;
export type UpdateTaskInput = z.infer<typeof updateTaskSchema>;
