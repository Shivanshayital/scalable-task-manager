import { APP_DESCRIPTION, APP_NAME } from "@/constants";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background px-6 py-24 text-foreground">
      <div className="max-w-2xl space-y-6 rounded-2xl border border-border/70 bg-card/80 p-8 shadow-sm backdrop-blur">
        <div className="space-y-3">
          <p className="text-sm font-medium uppercase tracking-[0.24em] text-muted-foreground">
            Stage 1 architecture scaffold
          </p>
          <h1 className="text-4xl font-semibold tracking-tight">{APP_NAME}</h1>
          <p className="text-lg text-muted-foreground">{APP_DESCRIPTION}</p>
        </div>
        <div className="rounded-xl border border-dashed border-border/70 p-4 text-sm text-muted-foreground">
          The foundation is now initialized with the requested folder structure, Prisma configuration, and UI scaffolding.
        </div>
      </div>
    </main>
  );
}
