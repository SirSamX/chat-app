import { AuthModel, RecordModel } from "pocketbase";
import pb from "./pocketbase"


export const usersColl = pb.collection("users")

export async function login(provider: string) {
  await usersColl.authWithOAuth2({
    provider,
  })
}

export function logout() {
  pb.authStore.clear()
}

export function getCurrentUser(): AuthModel {
  return pb.authStore.model;
}

export async function getUser(id: string): Promise<RecordModel> {
  return await usersColl.getOne(id);
}

export function getIsAuthenticated() {
  return !!getCurrentUser();
}

export async function deleteUser() {
  const user = getCurrentUser();
  if (!user) return;
  await usersColl.delete(user.id);
}
