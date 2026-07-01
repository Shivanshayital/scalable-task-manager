import { NextRequest } from "next/server";
import { registerUser } from "@/services/auth.service";
import { handleApiError, sendSuccess, ApiError } from "@/utils/apiResponse";
import { registerSchema } from "@/validators/auth";

export async function POST(request: NextRequest) {
  try {
    let body: unknown;

    try {
      body = await request.json();
    } catch {
      throw new ApiError(400, "Request body must be valid JSON");
    }

    const parsed = registerSchema.safeParse(body);

    if (!parsed.success) {
      throw new ApiError(400, "Invalid request payload", parsed.error.flatten().fieldErrors);
    }

    const result = await registerUser(parsed.data);
    return sendSuccess(201, result);
  } catch (error) {
    return handleApiError(error);
  }
}
