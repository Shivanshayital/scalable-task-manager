"use client";

import Link from "next/link";
import { Home, LayoutDashboard, LogOut, PlusCircle, Sparkles, Users } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";

type NavItem = {
  href: string;
  label: string;
  icon: typeof LayoutDashboard;
  adminOnly?: boolean;
};

const navItems: NavItem[] = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/dashboard", label: "Tasks", icon: Sparkles },
];

export function Sidebar({ active }: { active?: string }) {
  const { user, logout } = useAuth();

  return (
    <aside className="hidden w-72 shrink-0 flex-col gap-6 border-r border-border/70 bg-sidebar/95 p-6 text-sidebar-foreground shadow-sm shadow-black/5 dark:bg-[#151515] md:flex">
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 text-lg font-semibold text-sidebar-foreground">
          <Sparkles size={20} />
          <span>Scalable</span>
        </div>
        <p className="text-sm text-sidebar-accent-foreground">Modern workflow and productivity suite.</p>
      </div>

      <nav className="space-y-1">
        {navItems.map((item) => {
          if (item.adminOnly && user?.role !== "ADMIN") return null;
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                active === item.href ? "bg-sidebar-accent text-sidebar-accent-foreground" : "text-sidebar-foreground",
              )}
            >
              <Icon size={18} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto rounded-3xl border border-border/80 bg-card p-4">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-sm font-medium text-sidebar-foreground">{user?.name}</p>
            <p className="text-xs text-muted-foreground">{user?.role.toLowerCase()}</p>
          </div>
          <button
            type="button"
            className="rounded-2xl bg-muted/70 px-3 py-2 text-sm font-medium text-foreground transition hover:bg-muted"
            onClick={logout}
          >
            <LogOut size={16} />
          </button>
        </div>
      </div>
    </aside>
  );
}
