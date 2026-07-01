import { cn } from "@/lib/utils";

const statusStyles: Record<string, string> = {
  PENDING: "bg-yellow-500/10 text-yellow-900 dark:text-yellow-200 dark:bg-yellow-400/10",
  IN_PROGRESS: "bg-sky-500/10 text-sky-900 dark:text-sky-200 dark:bg-sky-400/10",
  COMPLETED: "bg-emerald-500/10 text-emerald-900 dark:text-emerald-200 dark:bg-emerald-400/10",
};

export function Badge({ status }: { status: string }) {
  return (
    <span className={cn("inline-flex rounded-full px-3 py-1 text-xs font-semibold", statusStyles[status] ?? "bg-muted text-foreground")}> 
      {status.replace("_", " ")}
    </span>
  );
}
