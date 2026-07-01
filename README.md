# Scalable Task Manager

Scalable Task Manager is a production-style full-stack task management application built with Next.js, TypeScript, Prisma, PostgreSQL, and a polished SaaS-inspired frontend. It demonstrates a clean architecture for authentication, authorization, task CRUD operations, and API documentation in a portfolio-ready project.

## Project Overview

This project combines a robust backend API with a modern user interface to deliver a complete task management experience. The application supports user registration and login, role-based access control, secure task creation and management, and interactive Swagger documentation for all REST endpoints.

## Features

- Secure authentication with JWT and bcrypt
- Role-based authorization for admin and regular users
- Task CRUD operations with ownership enforcement
- Premium-looking dashboard UI with responsive layout
- OpenAPI/Swagger documentation at /api/docs
- Prisma-powered PostgreSQL persistence
- Clean service and repository layer for maintainable backend logic

## Tech Stack

- Frontend: Next.js 16, React 19, TypeScript, Tailwind CSS
- UI: shadcn/ui-inspired components, Framer Motion, Lucide React
- Backend: Next.js Route Handlers, Zod validation, JWT, bcryptjs
- Data Layer: Prisma ORM, PostgreSQL
- Documentation: Swagger UI / OpenAPI

## Architecture

The application follows a modular architecture:

- App Router for page and API route organization
- Route handlers for REST endpoints under src/app/api/v1
- Service layer for business logic
- Repository layer for database access
- Shared validation and response utilities
- Client-side services and hooks for the frontend experience

## Folder Structure

```text
src/
  app/
    api/
      v1/
        auth/
        tasks/
        users/
      docs/
    auth/
    dashboard/
  components/
    auth/
    layout/
    ui/
  hooks/
  lib/
  repositories/
  services/
  types/
  validators/
  utils/
prisma/
  schema.prisma
  seed.ts
```

## API Endpoints

### Authentication

- POST /api/v1/auth/register
- POST /api/v1/auth/login

### Users

- GET /api/v1/users (Admin only)

### Tasks

- GET /api/v1/tasks
- POST /api/v1/tasks
- GET /api/v1/tasks/[id]
- PUT /api/v1/tasks/[id]
- DELETE /api/v1/tasks/[id]

### Documentation

- GET /api/docs
- GET /api/docs/openapi.json

## Authentication Flow

1. A user registers with name, email, and password.
2. The password is hashed before being persisted.
3. The user logs in with email and password.
4. The server validates credentials and issues a JWT.
5. Subsequent requests include the token in the Authorization header as a Bearer token.
6. Protected endpoints verify the token and enforce role-based authorization.

## Database Schema

The database uses Prisma with PostgreSQL and includes:

- User
  - id
  - name
  - email
  - password
  - role (USER or ADMIN)
  - createdAt / updatedAt
- Task
  - id
  - title
  - description
  - status (PENDING, IN_PROGRESS, COMPLETED)
  - userId
  - createdAt / updatedAt

Relationships:

- One user can own many tasks.
- Each task belongs to exactly one user.

## Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

3. Create your environment file:

```bash
cp .env.example .env.local
```

4. Configure PostgreSQL and set the required environment variables.

## Environment Variables

| Variable | Description |
| --- | --- |
| DATABASE_URL | PostgreSQL connection string |
| JWT_SECRET | Secret used to sign JWTs |
| NEXT_PUBLIC_APP_NAME | Optional app display name |

## Running Locally

Start the development server:

```bash
npm run dev
```

Then open:

- http://localhost:3000
- http://localhost:3000/api/docs

## Swagger Documentation

Interactive API documentation is available at:

- /api/docs
- /api/docs/openapi.json

The Swagger UI includes request/response schemas, authentication details, and status code descriptions for the existing REST endpoints.

## Future Improvements

- Add automated unit and integration tests
- Introduce refresh token support
- Add pagination and filtering for tasks
- Support file attachments or labels
- Add analytics and reporting dashboards
- Improve deployment and CI/CD pipeline configuration

## Screenshots

### Login Page
![Login Page](./login-page.png)

### Register Page
![Register Page](./register-page.png)

### Dashboard
![Dashboard](./dashboard.png)

### Create Task
![Create Task](./create-task.png)

### Task Management
![Task Management](./tasks.png)

### Swagger API Documentation
![Swagger](./swagger.png)

### Dark Mode
![Dark Mode](./dark-mode.png)

## License

This project is intended for educational and portfolio purposes.
