import { NextRequest } from "next/server";
import { getAdminUserList } from "@/services/user.service";
import { authenticateRequest, authorizeRoles } from "@/lib/auth";
import { handleApiError, sendSuccess } from "@/utils/apiResponse";

export async function GET(request: NextRequest) {
  try {
    const payload = authenticateRequest(request);
    authorizeRoles(payload, ["ADMIN"]);

    const users = await getAdminUserList();
    return sendSuccess(200, { users });
  } catch (error) {
    return handleApiError(error);
  }
}
