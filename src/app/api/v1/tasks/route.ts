import { NextRequest } from "next/server";
import { authenticateRequest } from "@/lib/auth";
import { handleApiError, sendSuccess, ApiError } from "@/utils/apiResponse";
import { createTaskSchema } from "@/validators/task";
import { createTaskForUser } from "@/services/task.service";

export async function POST(request: NextRequest) {
  try {
    let body: unknown;

    try {
      body = await request.json();
    } catch {
      throw new ApiError(400, "Request body must be valid JSON");
    }

    const parsed = createTaskSchema.safeParse(body);

    if (!parsed.success) {
      throw new ApiError(400, "Invalid request payload", parsed.error.flatten().fieldErrors);
    }

    const auth = authenticateRequest(request);
    const task = await createTaskForUser(auth.sub, parsed.data);

    return sendSuccess(201, task);
  } catch (error) {
    return handleApiError(error);
  }
}
