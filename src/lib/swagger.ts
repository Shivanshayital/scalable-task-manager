export const swaggerSpec = {
  openapi: "3.0.3",
  info: {
    title: "Scalable Task Manager API",
    version: "1.0.0",
    description:
      "Production-ready REST API for user authentication, authorization, and task management.",
  },
  servers: [
    {
      url: "http://localhost:3000",
      description: "Local development server",
    },
  ],
  tags: [
    {
      name: "Auth",
      description: "User registration and login endpoints",
    },
    {
      name: "Users",
      description: "Administrative user management endpoints",
    },
    {
      name: "Tasks",
      description: "CRUD operations for user tasks",
    },
  ],
  paths: {
    "/api/v1/auth/register": {
      post: {
        tags: ["Auth"],
        summary: "Register a new user",
        description: "Create a new user account with a unique email address.",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/RegisterRequest",
              },
            },
          },
        },
        responses: {
          "201": {
            description: "User registered successfully",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/RegisterResponse",
                },
              },
            },
          },
          "400": {
            $ref: "#/components/responses/BadRequest",
          },
          "409": {
            $ref: "#/components/responses/Conflict",
          },
          "500": {
            $ref: "#/components/responses/InternalServerError",
          },
        },
      },
    },
    "/api/v1/auth/login": {
      post: {
        tags: ["Auth"],
        summary: "Authenticate a user",
        description: "Validate user credentials and issue a JWT bearer token.",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/LoginRequest",
              },
            },
          },
        },
        responses: {
          "200": {
            description: "Authentication successful",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/LoginResponse",
                },
              },
            },
          },
          "400": {
            $ref: "#/components/responses/BadRequest",
          },
          "401": {
            $ref: "#/components/responses/Unauthorized",
          },
          "500": {
            $ref: "#/components/responses/InternalServerError",
          },
        },
      },
    },
    "/api/v1/users": {
      get: {
        tags: ["Users"],
        summary: "List all users",
        description: "Return the complete list of users. This endpoint is restricted to administrators.",
        security: [{ bearerAuth: [] }],
        responses: {
          "200": {
            description: "Users retrieved successfully",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/UserListResponse",
                },
              },
            },
          },
          "401": {
            $ref: "#/components/responses/Unauthorized",
          },
          "403": {
            $ref: "#/components/responses/Forbidden",
          },
          "500": {
            $ref: "#/components/responses/InternalServerError",
          },
        },
      },
    },
    "/api/v1/tasks": {
      get: {
        tags: ["Tasks"],
        summary: "List tasks",
        description: "List all tasks for the authenticated user, or every task for administrators.",
        security: [{ bearerAuth: [] }],
        responses: {
          "200": {
            description: "Tasks retrieved successfully",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/TaskListResponse",
                },
              },
            },
          },
          "401": {
            $ref: "#/components/responses/Unauthorized",
          },
          "500": {
            $ref: "#/components/responses/InternalServerError",
          },
        },
      },
      post: {
        tags: ["Tasks"],
        summary: "Create a task",
        description: "Create a new task for the authenticated user.",
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/CreateTaskRequest",
              },
            },
          },
        },
        responses: {
          "201": {
            description: "Task created successfully",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/TaskResponse",
                },
              },
            },
          },
          "400": {
            $ref: "#/components/responses/BadRequest",
          },
          "401": {
            $ref: "#/components/responses/Unauthorized",
          },
          "500": {
            $ref: "#/components/responses/InternalServerError",
          },
        },
      },
    },
    "/api/v1/tasks/{id}": {
      get: {
        tags: ["Tasks"],
        summary: "Get a task by id",
        description: "Retrieve a specific task if it belongs to the authenticated user or the user is an administrator.",
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: {
              type: "string",
            },
            description: "Task identifier",
          },
        ],
        responses: {
          "200": {
            description: "Task retrieved successfully",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/TaskResponse",
                },
              },
            },
          },
          "401": {
            $ref: "#/components/responses/Unauthorized",
          },
          "404": {
            $ref: "#/components/responses/NotFound",
          },
          "500": {
            $ref: "#/components/responses/InternalServerError",
          },
        },
      },
      put: {
        tags: ["Tasks"],
        summary: "Update a task",
        description: "Update the title or description of a task you own, or any task if you are an administrator.",
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: {
              type: "string",
            },
            description: "Task identifier",
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/UpdateTaskRequest",
              },
            },
          },
        },
        responses: {
          "200": {
            description: "Task updated successfully",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/TaskResponse",
                },
              },
            },
          },
          "400": {
            $ref: "#/components/responses/BadRequest",
          },
          "401": {
            $ref: "#/components/responses/Unauthorized",
          },
          "404": {
            $ref: "#/components/responses/NotFound",
          },
          "500": {
            $ref: "#/components/responses/InternalServerError",
          },
        },
      },
      delete: {
        tags: ["Tasks"],
        summary: "Delete a task",
        description: "Delete a specific task if it belongs to the authenticated user or the user is an administrator.",
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: {
              type: "string",
            },
            description: "Task identifier",
          },
        ],
        responses: {
          "204": {
            description: "Task deleted successfully",
          },
          "401": {
            $ref: "#/components/responses/Unauthorized",
          },
          "404": {
            $ref: "#/components/responses/NotFound",
          },
          "500": {
            $ref: "#/components/responses/InternalServerError",
          },
        },
      },
    },
  },
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
    schemas: {
      RegisterRequest: {
        type: "object",
        required: ["name", "email", "password"],
        properties: {
          name: { type: "string", minLength: 2 },
          email: { type: "string", format: "email" },
          password: { type: "string", minLength: 8 },
        },
      },
      LoginRequest: {
        type: "object",
        required: ["email", "password"],
        properties: {
          email: { type: "string", format: "email" },
          password: { type: "string" },
        },
      },
      CreateTaskRequest: {
        type: "object",
        required: ["title", "description"],
        properties: {
          title: { type: "string", minLength: 3 },
          description: { type: "string", minLength: 5 },
        },
      },
      UpdateTaskRequest: {
        type: "object",
        properties: {
          title: { type: "string", minLength: 3 },
          description: { type: "string", minLength: 5 },
        },
      },
      User: {
        type: "object",
        properties: {
          id: { type: "string" },
          name: { type: "string" },
          email: { type: "string", format: "email" },
          role: { type: "string", enum: ["USER", "ADMIN"] },
          createdAt: { type: "string", format: "date-time" },
          updatedAt: { type: "string", format: "date-time" },
        },
      },
      Task: {
        type: "object",
        properties: {
          id: { type: "string" },
          title: { type: "string" },
          description: { type: "string" },
          status: { type: "string", enum: ["PENDING", "IN_PROGRESS", "COMPLETED"] },
          createdAt: { type: "string", format: "date-time" },
          updatedAt: { type: "string", format: "date-time" },
          userId: { type: "string" },
        },
      },
      RegisterResponse: {
        type: "object",
        properties: {
          success: { type: "boolean", example: true },
          data: {
            type: "object",
            properties: {
              message: { type: "string" },
              user: { $ref: "#/components/schemas/User" },
            },
          },
        },
      },
      LoginResponse: {
        type: "object",
        properties: {
          success: { type: "boolean", example: true },
          data: {
            type: "object",
            properties: {
              token: { type: "string" },
              user: { $ref: "#/components/schemas/User" },
            },
          },
        },
      },
      UserListResponse: {
        type: "object",
        properties: {
          success: { type: "boolean", example: true },
          data: {
            type: "object",
            properties: {
              users: {
                type: "array",
                items: { $ref: "#/components/schemas/User" },
              },
            },
          },
        },
      },
      TaskResponse: {
        type: "object",
        properties: {
          success: { type: "boolean", example: true },
          data: {
            $ref: "#/components/schemas/Task",
          },
        },
      },
      TaskListResponse: {
        type: "object",
        properties: {
          success: { type: "boolean", example: true },
          data: {
            type: "object",
            properties: {
              tasks: {
                type: "array",
                items: { $ref: "#/components/schemas/Task" },
              },
            },
          },
        },
      },
      ErrorResponse: {
        type: "object",
        properties: {
          success: { type: "boolean", example: false },
          message: { type: "string" },
          details: {
            type: "object",
            nullable: true,
          },
        },
      },
    },
    responses: {
      BadRequest: {
        description: "The request payload is invalid",
        content: {
          "application/json": {
            schema: { $ref: "#/components/schemas/ErrorResponse" },
          },
        },
      },
      Unauthorized: {
        description: "Authentication failed or missing bearer token",
        content: {
          "application/json": {
            schema: { $ref: "#/components/schemas/ErrorResponse" },
          },
        },
      },
      Forbidden: {
        description: "The authenticated user does not have the required role",
        content: {
          "application/json": {
            schema: { $ref: "#/components/schemas/ErrorResponse" },
          },
        },
      },
      NotFound: {
        description: "The requested resource was not found",
        content: {
          "application/json": {
            schema: { $ref: "#/components/schemas/ErrorResponse" },
          },
        },
      },
      Conflict: {
        description: "The requested resource already exists",
        content: {
          "application/json": {
            schema: { $ref: "#/components/schemas/ErrorResponse" },
          },
        },
      },
      InternalServerError: {
        description: "An unexpected server error occurred",
        content: {
          "application/json": {
            schema: { $ref: "#/components/schemas/ErrorResponse" },
          },
        },
      },
    },
  },
} as const;
