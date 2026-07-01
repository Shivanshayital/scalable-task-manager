import api from "@/lib/axios";
import type { Task, TaskCreateInput, TaskUpdateInput } from "@/types/task";

export async function getTasks() {
  const response = await api.get<{ success: boolean; data: { tasks: Task[] } }>("/tasks");
  return response.data.data.tasks;
}

export async function createTask(payload: TaskCreateInput) {
  const response = await api.post<{ success: boolean; data: Task }>("/tasks", payload);
  return response.data.data;
}

export async function updateTask(taskId: string, payload: TaskUpdateInput) {
  const response = await api.put<{ success: boolean; data: Task }>(`/tasks/${taskId}`, payload);
  return response.data.data;
}

export async function deleteTask(taskId: string) {
  await api.delete(`/tasks/${taskId}`);
}
