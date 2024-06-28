import { useRouter } from "next/router"
import pb from "../lib/pocketbase"
import { RefObject, useRef, useState } from "react"

export async function login(provider: string) {

    const authData = await pb.collection("users").authWithOAuth2({
      provider: provider
    })

    if(authData.token) {
        window.location.href = 'http://localhost:3001'

    }
}