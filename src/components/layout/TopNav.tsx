"use client";

import { Moon, SunMedium, Search, UserCircle2 } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";

export function TopNav({ search, onSearch }: { search: string; onSearch: (value: string) => void }) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div className="space-y-2">
        <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
          <p className="text-xs uppercase tracking-[0.25em] text-sidebar-accent-foreground">Dashboard</p>
          <span>•</span>
          <p>Welcome back, {user?.name ?? "Team"}.</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground">Task workspace</h1>
          <span className="rounded-full bg-muted px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">
            {user?.role}
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-3 sm:flex-row sm:items-center sm:justify-end">
        <label className="relative w-full sm:w-auto">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            value={search}
            onChange={(event) => onSearch(event.target.value)}
            placeholder="Search tasks..."
            className="w-full rounded-2xl border border-border bg-background py-3 pl-10 pr-4 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 sm:w-[260px]"
          />
        </label>
        <button
          type="button"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className={cn(
            "inline-flex h-11 items-center justify-center rounded-2xl border border-border bg-card px-4 text-sm text-foreground transition hover:border-primary hover:text-primary",
          )}
        >
          {mounted && theme === "dark" ? <SunMedium size={18} /> : <Moon size={18} />}
        </button>
        <div className="inline-flex h-11 items-center justify-center rounded-2xl border border-border bg-card px-4 text-sm text-foreground">
          <UserCircle2 className="mr-2" size={18} />
          {user?.name?.split(" ")[0]}
        </div>
      </div>
    </div>
  );
}
