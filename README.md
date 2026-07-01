# Scalable Task Manager

A production-ready architecture scaffold for a task management application built with Next.js, TypeScript, Tailwind CSS, shadcn/ui, Prisma, and PostgreSQL.

## Stage 2 scope

This repository now includes the database design and Prisma configuration for the task manager application:

- PostgreSQL datasource configuration
- Prisma schema with User and Task models
- Role and task status enums
- Prisma relation from User to Task
- Seed script for an initial administrator user

## Database setup

1. Copy .env.example to .env.local if needed.
2. Set a valid PostgreSQL connection string in DATABASE_URL.
3. Run the Prisma migration workflow below.

## Migration commands

```bash
npx prisma generate
npx prisma migrate dev --name init_database
```

## Seed command

```bash
npx prisma db seed
```

This creates or updates the Administrator user with the seeded credentials.

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000 to view the application shell.
