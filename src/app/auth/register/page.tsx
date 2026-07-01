"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { z } from "zod";
import { registerSchema } from "@/validators/auth";
import { useAuth } from "@/hooks/useAuth";
import { buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type RegisterFormValues = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const { isAuthenticated, register: registerUser, loading } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
  });

  useEffect(() => {
    if (isAuthenticated) {
      window.location.href = "/dashboard";
    }
  }, [isAuthenticated]);

  const onSubmit = async (values: RegisterFormValues) => {
    try {
      await registerUser(values);
      toast.success("Account created successfully!");
    } catch (error) {
      toast.error("Registration failed. Try again.");
    }
  };

  return (
    <main className="grid min-h-screen place-items-center bg-background px-6 py-24 text-foreground">
      <div className="w-full max-w-xl space-y-8 rounded-[2rem] border border-border/70 bg-card/95 p-10 shadow-2xl shadow-black/10">
        <div className="space-y-3">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-muted-foreground">Create account</p>
          <h1 className="text-4xl font-semibold">Start collaborating</h1>
          <p className="text-sm text-muted-foreground">Register to manage tasks with a polished dashboard experience.</p>
        </div>

        <form className="grid gap-5" onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-2">
            <label className="text-sm font-medium text-foreground">Full name</label>
            <Input type="text" placeholder="Jane Doe" {...register("name")} />
            {errors.name ? <p className="text-sm text-destructive">{errors.name.message}</p> : null}
          </div>

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

          <button type="submit" disabled={isSubmitting || loading} className={buttonVariants({ className: "w-full" })}>
            {isSubmitting ? "Creating account..." : "Create account"}
          </button>
        </form>

        <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
          <span>Already have an account?</span>
          <Link href="/auth/login" className="font-semibold text-primary underline-offset-4 hover:underline">
            Sign in
          </Link>
        </div>
      </div>
    </main>
  );
}
