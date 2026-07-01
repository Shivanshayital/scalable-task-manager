"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { z } from "zod";
import { loginSchema } from "@/validators/auth";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const { isAuthenticated, login, loading } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  useEffect(() => {
    if (isAuthenticated) {
      window.location.href = "/dashboard";
    }
  }, [isAuthenticated]);

  const onSubmit = async (values: LoginFormValues) => {
    try {
      await login(values);
      toast.success("Welcome back!");
    } catch (error) {
      toast.error("Login failed. Check your credentials.");
    }
  };

  return (
    <main className="grid min-h-screen place-items-center bg-background px-6 py-24 text-foreground">
      <div className="w-full max-w-xl space-y-8 rounded-[2rem] border border-border/70 bg-card/95 p-10 shadow-2xl shadow-black/10">
        <div className="space-y-3">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-muted-foreground">Sign in</p>
          <h1 className="text-4xl font-semibold">Welcome back</h1>
          <p className="text-sm text-muted-foreground">Enter your credentials to access your task dashboard.</p>
        </div>

        <form className="grid gap-5" onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-2">
            <label className="text-sm font-medium text-foreground">Email</label>
            <Input type="email" placeholder="hello@company.com" {...register("email")} />
            {errors.email ? <p className="text-sm text-destructive">{errors.email.message}</p> : null}
          </div>

          <div className="grid gap-2">
            <label className="text-sm font-medium text-foreground">Password</label>
            <Input type="password" placeholder="••••••••" {...register("password")} />
            {errors.password ? <p className="text-sm text-destructive">{errors.password.message}</p> : null}
          </div>

          <Button type="submit" disabled={isSubmitting || loading} className="w-full">
            {isSubmitting ? "Signing in..." : "Sign in"}
          </Button>
        </form>

        <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
          <span>New to the app?</span>
          <Link href="/auth/register" className="font-semibold text-primary underline-offset-4 hover:underline">
            Create an account
          </Link>
        </div>
      </div>
    </main>
  );
}
