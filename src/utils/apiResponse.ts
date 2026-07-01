import { NextResponse } from "next/server";
import { ZodError } from "zod";

export class ApiError extends Error {
  statusCode: number;
  details?: unknown;

  constructor(statusCode: number, message: string, details?: unknown) {
    super(message);
    this.name = "ApiError";
    this.statusCode = statusCode;
    this.details = details;
  }
}

export function sendSuccess<T>(status: number, data: T) {
  return NextResponse.json({ success: true, data }, { status });
}

export function sendError(status: number, message: string, details?: unknown) {
  return NextResponse.json({ success: false, message, details }, { status });
}

export function handleApiError(error: unknown) {
  if (error instanceof ApiError) {
    return sendError(error.statusCode, error.message, error.details);
  }

  if (error instanceof ZodError) {
    return sendError(400, "Invalid request payload", error.flatten().fieldErrors);
  }

  return sendError(500, "Internal server error");
}
