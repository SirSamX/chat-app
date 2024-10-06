import pb from "./pocketbase"


const usersColl = pb.collection("users")

export async function login(provider: string) {
  await usersColl.authWithOAuth2({
    provider,
  })
}

export function logout() {
  pb.authStore.clear()
}

export function getCurrentUser() {
  return pb.authStore.model;
}

export function getIsAuthenticated() {
  return !!getCurrentUser();
}
