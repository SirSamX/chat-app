"use client"

import React, { FormEvent } from "react";
import AuthButtons from "@/components/AuthBtns";
import pb from "@/lib/pocketbase";
import { getCurrentUser, usersColl } from "@/lib/user";
import { redirect } from "next/navigation";
import Link from "next/link";


export default function Login() {

  
  async function login(formData: FormData) {
    
    const nameOrEmail = formData.get("nameOrEmail") as string;
    const password = formData.get("password") as string;

    try {
      await usersColl.authWithPassword(nameOrEmail, password);
      console.log("Successfully logged in")
    }
    catch(err) {
      console.error(err);
    }
    redirect("/")


  }

  return(
    <>
      <form action={login}>
        <input type="text" placeholder="Username/Email" name="nameOrEmail" />
        <input type="password" placeholder="password" name="password" />

        <button type="submit">Log In</button>

      </form>

      <p>Don&#39;t have an account?</p>
      <Link className="text-blue-500" href={"/signup"}>Create one here!</Link>

      <div className="providers flex justify-center items-center w-full h-screen bg-gradient-to-br from-gray-600 to-black">
        <AuthButtons />
      </div>
    </>
  )
}