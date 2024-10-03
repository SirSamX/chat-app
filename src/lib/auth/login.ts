import pb, { usersColl } from "../pocketbase"


export async function login(provider: string) {
  await usersColl.authWithOAuth2({
    provider: provider
  })
}
