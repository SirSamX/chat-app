import pb from "../pocketbase"


export async function login(provider: string) {
  const authData = await pb.collection("users").authWithOAuth2({
    provider: provider
  })

  const sessionData = pb.authStore.exportToCookie()
  document.cookie = sessionData
}
