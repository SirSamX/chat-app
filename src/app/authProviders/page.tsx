"use client"

import { OAuth2AuthConfig } from "pocketbase"
import pb from "../lib/pocketbase"
import styles from "./page.module.css";
import { login } from "../auth/login";
import { useRef, useState } from "react";

export default function Auth() {

    return(
        <>
        <div className="providers flex justify-center items-center w-full h-screen bg-gradient-to-br from-gray-600 to-black">


            <button onClick={() => login("discord" )} className={styles.authBtn}>
                Discord
            </button>

            <button onClick={() => login("google")} className={styles.authBtn}>
                Google
            </button>

            <button onClick={() => login("github")} className={styles.authBtn} disabled>
                Github
            </button>

            <button onClick={() => login("twitter")} className={styles.authBtn} disabled>
                X (Twitter)
            </button>
                

        </div> 
        </>
    )
}