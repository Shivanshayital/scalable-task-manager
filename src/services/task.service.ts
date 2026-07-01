import { createTask, deleteTask, findAllTasks, findTaskById, findTasksForUser, updateTask } from "@/repositories/task.repository";
import type { CreateTaskInput, UpdateTaskInput } from "@/validators/task";
import { ApiError } from "@/utils/apiResponse";
import type { AuthPayload } from "@/lib/auth";

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

export async function listTasksForUser(payload: AuthPayload) {
  if (payload.role === "ADMIN") {
    return findAllTasks();
  }

  return findTasksForUser(payload.sub);
}

export async function getTaskByIdForUser(taskId: string, payload: AuthPayload) {
  const task = await findTaskById(taskId);

  if (!task) {
    throw new ApiError(404, "Task not found");
  }

  if (payload.role !== "ADMIN" && task.userId !== payload.sub) {
    throw new ApiError(404, "Task not found");
  }

  return task;
}

export async function updateTaskForUser(taskId: string, payload: AuthPayload, input: UpdateTaskInput) {
  const task = await findTaskById(taskId);

  if (!task) {
    throw new ApiError(404, "Task not found");
  }

  if (payload.role !== "ADMIN" && task.userId !== payload.sub) {
    throw new ApiError(404, "Task not found");
  }

  return updateTask(taskId, {
    title: input.title,
    description: input.description,
  });
}

export async function deleteTaskForUser(taskId: string, payload: AuthPayload) {
  const task = await findTaskById(taskId);

  if (!task) {
    throw new ApiError(404, "Task not found");
  }

  if (payload.role !== "ADMIN" && task.userId !== payload.sub) {
    throw new ApiError(404, "Task not found");
  }

  return deleteTask(taskId);
}
