import { AuthModel, RecordModel } from "pocketbase";
import pb from "./pocketbase"
import { revalidatePath } from "next/cache";


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

export async function deleteUser() {
  const user = getCurrentUser();
  if (!user) return;
  await usersColl.delete(user.id);
}
