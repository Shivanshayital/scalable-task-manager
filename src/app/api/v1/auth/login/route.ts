import { NextRequest } from "next/server";
import { loginUser } from "@/services/auth.service";
import { handleApiError, sendSuccess, ApiError } from "@/utils/apiResponse";
import { loginSchema } from "@/validators/auth";

export async function POST(request: NextRequest) {
  try {
    let body: unknown;

    try {
      body = await request.json();
    } catch {
      throw new ApiError(400, "Request body must be valid JSON");
    }

    const parsed = loginSchema.safeParse(body);

    if (!parsed.success) {
      throw new ApiError(400, "Invalid request payload", parsed.error.flatten().fieldErrors);
    }

    const result = await loginUser(parsed.data);
    return sendSuccess(200, result);
  } catch (error) {
    return handleApiError(error);
  }
}
