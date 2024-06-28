"use client"

import styles from "./page.module.css";
import { login } from "../lib/auth/login";
import { useRouter } from "next/navigation";


export default function Auth() {
  const router = useRouter()

  async function handleLogin(provider: string) {
    await login(provider)
    router.push("/")
  }

  return(
    <>
      <div className="providers flex justify-center items-center w-full h-screen bg-gradient-to-br from-gray-600 to-black">

        <button onClick={() => handleLogin("discord")} className={styles.authBtn}>
          Discord
        </button>

        <button onClick={() => handleLogin("google")} className={styles.authBtn}>
          Google
        </button>

        <button onClick={() => handleLogin("github")} className={styles.authBtn} disabled>
          Github
        </button>

        <button onClick={() => handleLogin("twitter")} className={styles.authBtn} disabled>
          X (Twitter)
        </button>     

      </div> 
    </>
  )
}