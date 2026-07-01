import { NextRequest, NextResponse } from "next/server";
import { authenticateRequest } from "@/lib/auth";
import { handleApiError, sendSuccess, ApiError } from "@/utils/apiResponse";
import { deleteTaskForUser, getTaskByIdForUser, updateTaskForUser } from "@/services/task.service";
import { updateTaskSchema } from "@/validators/task";

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

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    let body: unknown;

    try {
      body = await request.json();
    } catch {
      throw new ApiError(400, "Request body must be valid JSON");
    }

    const parsed = updateTaskSchema.safeParse(body);

    if (!parsed.success) {
      throw new ApiError(400, "Invalid request payload", parsed.error.flatten().fieldErrors);
    }

    const auth = authenticateRequest(request);
    const resolvedParams = await params;
    const task = await updateTaskForUser(resolvedParams.id, auth, parsed.data);

    return sendSuccess(200, task);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const auth = authenticateRequest(request);
    const resolvedParams = await params;

    await deleteTaskForUser(resolvedParams.id, auth);
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    return handleApiError(error);
  }
}
