import bcrypt from "bcryptjs";
import { generateToken } from "@/lib/jwt";
import { createUser, findUserByEmail } from "@/repositories/user.repository";
import type { LoginInput, RegisterInput } from "@/validators/auth";
import { ApiError } from "@/utils/apiResponse";

function sanitizeUser(user: {
  id: string;
  name: string;
  email: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
}) {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
}

export async function registerUser(input: RegisterInput) {
  const existingUser = await findUserByEmail(input.email);

  if (existingUser) {
    throw new ApiError(409, "Email is already registered");
  }

  const hashedPassword = await bcrypt.hash(input.password, 12);
  const user = await createUser({
    name: input.name,
    email: input.email,
    password: hashedPassword,
    role: "USER",
  });

  return {
    message: "User registered successfully",
    user: sanitizeUser(user),
  };
}

export async function loginUser(input: LoginInput) {
  const user = await findUserByEmail(input.email);

  if (!user) {
    throw new ApiError(401, "Invalid email or password");
  }

  const isPasswordValid = await bcrypt.compare(input.password, user.password);

  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid email or password");
  }

  const token = generateToken({ sub: user.id, email: user.email, role: user.role });

  return {
    token,
    user: sanitizeUser(user),
  };
}
