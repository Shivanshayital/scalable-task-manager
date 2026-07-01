"use client";

import dynamic from "next/dynamic";
import "swagger-ui-react/swagger-ui.css";

const SwaggerUI = dynamic(() => import("swagger-ui-react"), { ssr: false });

export default function SwaggerDocsPage() {
  return (
    <main className="min-h-screen bg-background px-4 py-6 text-foreground">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 space-y-2">
          <p className="text-sm font-medium uppercase tracking-[0.3em] text-muted-foreground">API Documentation</p>
          <h1 className="text-3xl font-semibold">Scalable Task Manager REST API</h1>
          <p className="max-w-3xl text-sm text-muted-foreground">
            Explore the authentication, user management, and task management endpoints with interactive Swagger UI.
          </p>
        </div>
        <SwaggerUI url="/api/docs/openapi.json" />
      </div>
    </main>
  );
}
