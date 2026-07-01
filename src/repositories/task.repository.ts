import { prisma } from "@/lib/prisma";
import type { Prisma } from "@prisma/client";

export async function createTask(data: Prisma.TaskCreateInput) {
  return prisma.task.create({ data });
}
