"use client";

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { clearAuthStorage, getToken, getUser, setToken, setUser } from "@/lib/storage";
import { login as loginRequest, register as registerRequest } from "@/services/client/auth.service";
import type { User } from "@/types/auth";
import type { LoginInput, RegisterInput } from "@/validators/auth";

type AuthContextValue = {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (payload: LoginInput) => Promise<void>;
  register: (payload: RegisterInput) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUserState] = useState<User | null>(null);
  const [token, setTokenState] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const savedToken = getToken();
    const savedUser = getUser() as User | null;
    if (savedToken && savedUser) {
      setTokenState(savedToken);
      setUserState(savedUser);
    }
    setLoading(false);
  }, []);

  const login = async (payload: LoginInput) => {
    const result = await loginRequest(payload);
    setTokenState(result.token);
    setUserState(result.user);
    setToken(result.token);
    setUser(result.user);
    router.push("/dashboard");
  };

  const register = async (payload: RegisterInput) => {
    const result = await registerRequest(payload);
    setTokenState(result.token);
    setUserState(result.user);
    setToken(result.token);
    setUser(result.user);
    router.push("/dashboard");
  };

  const logout = () => {
    setTokenState(null);
    setUserState(null);
    clearAuthStorage();
    router.push("/auth/login");
  };

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      token,
      loading,
      isAuthenticated: Boolean(token && user),
      login,
      register,
      logout,
    }),
    [user, token, loading],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
