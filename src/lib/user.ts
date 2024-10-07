import { AuthModel } from "pocketbase";
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

export function getIsAuthenticated() {
  return !!getCurrentUser();
}
