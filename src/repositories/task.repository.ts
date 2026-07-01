import { prisma } from "@/lib/prisma";
import type { Prisma } from "@prisma/client";

export async function createTask(data: Prisma.TaskCreateInput) {
  return prisma.task.create({ data });
}

export async function updateTask(taskId: string, data: Prisma.TaskUpdateInput) {
  return prisma.task.update({ where: { id: taskId }, data });
}

export async function deleteTask(taskId: string) {
  return prisma.task.delete({ where: { id: taskId } });
}

export async function findTasksForUser(userId: string) {
  return prisma.task.findMany({ where: { userId } });
}

export async function findAllTasks() {
  return prisma.task.findMany();
}

export async function findTaskById(taskId: string) {
  return prisma.task.findUnique({ where: { id: taskId } });
}
