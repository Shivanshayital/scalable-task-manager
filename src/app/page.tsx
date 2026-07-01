import Link from "next/link";
import { ArrowRight, ShieldCheck, Sparkles, Zap } from "lucide-react";

export default function Home() {
  return (
    <main className="grid min-h-screen place-items-center bg-background px-6 py-24 text-foreground">
      <div className="w-full max-w-6xl rounded-[2rem] border border-border/70 bg-card/90 p-10 shadow-2xl shadow-black/10">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <section className="space-y-8">
            <div className="space-y-4">
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-muted-foreground">Premium SaaS dashboard</p>
              <h1 className="max-w-2xl text-5xl font-semibold tracking-tight text-foreground sm:text-6xl">
                Build your next scalable task workflow with a modern command center.
              </h1>
              <p className="max-w-xl text-base leading-8 text-muted-foreground">
                Designed to feel like Linear, Vercel, and Notion with a polished, responsive task experience powered by your existing backend APIs.
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <Link
                href="/auth/login"
                className="inline-flex items-center gap-2 rounded-2xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
              >
                Start now
                <ArrowRight size={16} />
              </Link>
              <Link
                href="/auth/register"
                className="inline-flex items-center gap-2 rounded-2xl border border-border px-6 py-3 text-sm font-semibold text-foreground transition hover:border-primary hover:text-primary"
              >
                Register
              </Link>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              {[
                { icon: ShieldCheck, label: "Secure auth" },
                { icon: Sparkles, label: "Modern UI" },
                { icon: Zap, label: "Smooth interactions" },
              ].map((item) => (
                <div key={item.label} className="rounded-3xl border border-border/70 bg-background/80 p-5">
                  <div className="mb-3 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <item.icon size={20} />
                  </div>
                  <p className="text-sm font-semibold text-foreground">{item.label}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-[2rem] border border-border/70 bg-background p-8 shadow-sm shadow-black/5">
            <div className="space-y-4">
              <p className="text-sm uppercase tracking-[0.24em] text-muted-foreground">Preview</p>
              <div className="space-y-3 rounded-[1.5rem] border border-border/70 bg-card p-6">
                <div className="mb-4 rounded-3xl border border-border/60 bg-background p-5">
                  <div className="mb-4 flex items-center justify-between">
                    <span className="rounded-full bg-muted px-3 py-1 text-xs uppercase tracking-[0.28em] text-muted-foreground">Live</span>
                    <span className="text-xs text-muted-foreground">v1.0</span>
                  </div>
                  <div className="grid gap-3">
                    <div className="h-3 rounded-full bg-muted/40 w-2/3" />
                    <div className="h-3 rounded-full bg-muted/40 w-1/2" />
                  </div>
                </div>
                <div className="grid gap-3">
                  <div className="flex items-center justify-between gap-4 rounded-3xl bg-background p-4">
                    <div>
                      <p className="text-sm font-semibold">Tasks today</p>
                      <p className="text-xs text-muted-foreground">2 completed · 1 in progress</p>
                    </div>
                    <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">In progress</span>
                  </div>
                  <div className="grid gap-2">
                    <div className="h-3 rounded-full bg-muted/50 w-full" />
                    <div className="h-3 rounded-full bg-muted/50 w-5/6" />
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
