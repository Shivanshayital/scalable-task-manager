import { NextRequest } from "next/server";
import { authenticateRequest } from "@/lib/auth";
import { handleApiError, sendSuccess } from "@/utils/apiResponse";
import { getTaskByIdForUser } from "@/services/task.service";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const auth = authenticateRequest(request);
    const resolvedParams = await params;
    const task = await getTaskByIdForUser(resolvedParams.id, auth);

    return sendSuccess(200, task);
  } catch (error) {
    return handleApiError(error);
  }
}
