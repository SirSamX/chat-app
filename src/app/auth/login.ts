import pb from "../lib/pocketbase"


export async function login(provider: string) {
    const authData = await pb.collection("users").authWithOAuth2({
      provider: provider
    })
}