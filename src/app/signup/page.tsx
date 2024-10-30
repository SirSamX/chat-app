"use client"

import React, { FormEvent } from "react";
import AuthButtons from "@/components/AuthBtns";
import pb from "@/lib/pocketbase";
import { getCurrentUser, usersColl } from "@/lib/user";
import { redirect } from "next/navigation";


export default function SignUp() {
  
  async function createAccount(formData: FormData) {
    
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const passwordConfirm = formData.get("passwordConfirm") as string;

    try {
        if(password != passwordConfirm) {
            console.log("Passwords does not match")
            return
        }

      await usersColl.create({
        "username": name,
        "email": email,
        "emailVisibility": false,
        "password": password,
        "passwordConfirm": passwordConfirm
      });
      console.log("Successfully created Account")
    }
    catch(err) {
      console.error(err);
    }
    redirect("/login")


  }

  return(
    <>
      <form action={createAccount}>
        <input type="text" placeholder="Username" name="name" />
        <input type="text" placeholder="Email" name="email" />
        <input type="password" placeholder="password" name="password" />
        <input type="password" placeholder="passwordConfirm" name="passwordConfirm" />

        <button type="submit">Create Account</button>

      </form>
{/* 
      <div className="providers flex justify-center items-center w-full h-screen bg-gradient-to-br from-gray-600 to-black">
        <AuthButtons />
      </div> */}
    </>
  )
}