import { NextRequest } from "next/server";
import { ApiError } from "@/utils/apiResponse";
import { verifyToken } from "@/lib/jwt";

export interface AuthPayload {
  sub: string;
  email: string;
  role: string;
  iat?: number;
  exp?: number;
}

export function getBearerToken(request: NextRequest) {
  const authorization = request.headers.get("authorization")?.trim();

  if (!authorization) {
    throw new ApiError(401, "Authorization header is required");
  }

  const [scheme, token] = authorization.split(" ");

  if (scheme !== "Bearer" || !token) {
    throw new ApiError(401, "Authorization header must use Bearer token format");
  }

  return token;
}

export function authenticateRequest(request: NextRequest) {
  const token = getBearerToken(request);

  try {
    const payload = verifyToken(token);

    if (typeof payload === "string") {
      throw new ApiError(401, "Invalid authentication token");
    }

    const { sub, email, role } = payload;

    if (!sub || !email || !role) {
      throw new ApiError(401, "Invalid authentication token");
    }

    return { sub, email, role, iat: payload.iat, exp: payload.exp };
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }

    throw new ApiError(401, "Invalid authentication token");
  }
}

export function authorizeRoles(payload: AuthPayload, allowedRoles: string[]) {
  if (!allowedRoles.includes(payload.role)) {
    throw new ApiError(403, "Access denied: insufficient permissions");
  }

  return payload;
}
