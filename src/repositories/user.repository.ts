import { prisma } from "@/lib/prisma";
import type { Prisma } from "@prisma/client";

export async function findUserByEmail(email: string) {
  return prisma.user.findUnique({ where: { email } });
}

export async function findAllUsers() {
  return prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
      updatedAt: true,
    },
  });
}

export async function createUser(data: Prisma.UserCreateInput) {
  return prisma.user.create({ data });
}
