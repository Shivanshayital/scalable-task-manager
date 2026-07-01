import { type HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Card({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-[2rem] border border-border/70 bg-card/90 p-6 shadow-sm shadow-muted/10 backdrop-blur-xl",
        className,
      )}
      {...props}
    />
  );
}
