import api from "@/lib/axios";
import type { AuthResponse } from "@/types/auth";
import type { LoginInput, RegisterInput } from "@/validators/auth";

export async function login(payload: LoginInput) {
  const response = await api.post<{ success: boolean; data: AuthResponse }>("/auth/login", payload);
  return response.data.data;
}

export async function register(payload: RegisterInput) {
  const response = await api.post<{ success: boolean; data: AuthResponse }>("/auth/register", payload);
  return response.data.data;
}
