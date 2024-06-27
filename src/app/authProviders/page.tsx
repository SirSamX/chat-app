"use client"

import { OAuth2AuthConfig } from "pocketbase"
import pb from "../lib/pocketbase"

export default function Auth() {
    
    async function login(provider: string) {
        await pb.collection("users").authWithOAuth2({
          provider: provider
        })
    }
    return(
        <>
        <div className="providers flex justify-center items-center w-full h-screen">

            <button onClick={() => login("discord")} className="mr-8">
                Discord
            </button>

            <button onClick={() => login("github")} className="mr-8">
                Github
            </button>

            <button onClick={() => login("google")} className="mr-8">
                Google
            </button>

            <button onClick={() => login("twitter")} className="mr-8">
                X (Twitter)
            </button>
                

        </div>
        </>
    )
}