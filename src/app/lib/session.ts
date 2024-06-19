import pb from "./pocketbase"

 
export async function handleLogin() {
  await pb.collection("users").authWithOAuth2({
    provider: "discord",
  })

  /*const sessionData = pb.authStore.exportToCookie.toString()
  console.log(sessionData)
	cookies().set("session", sessionData, {
		httpOnly: true,
		secure: true,
		path: '/',
  })*/
}