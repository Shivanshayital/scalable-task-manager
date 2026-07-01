import { findAllUsers } from "@/repositories/user.repository";

export async function getAdminUserList() {
  return findAllUsers();
}
