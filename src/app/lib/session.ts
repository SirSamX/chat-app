"use server"

import { cookies } from "next/headers"

 
export async function handleLogin(sessionData: string) {
  cookies().set("sessionToken", sessionData, {
		httpOnly: true,
		secure: true,
		path: '/',
    sameSite: "strict",
  })
}