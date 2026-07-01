import { createTask } from "@/repositories/task.repository";
import type { CreateTaskInput } from "@/validators/task";
import { ApiError } from "@/utils/apiResponse";

export async function createTaskForUser(userId: string, input: CreateTaskInput) {
  if (!userId) {
    throw new ApiError(401, "Authentication required");
  }

  const task = await createTask({
    title: input.title,
    description: input.description,
    status: "PENDING",
    user: {
      connect: {
        id: userId,
      },
    },
  });

  return task;
}
