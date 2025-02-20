"use client";

import React, { useState } from "react";
import AuthButtons from "@/components/AuthBtns";
import { usersColl } from "@/lib/user"; // Assuming getCurrentUser is not needed here
import { redirect } from "next/navigation";

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true); // State to toggle between login and signup

  async function handleSubmit(formData: FormData) {
    if (isLogin) {
      await login(formData);
    } else {
      await createAccount(formData);
    }
  }

  async function createAccount(formData: FormData) {
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const passwordConfirm = formData.get("passwordConfirm") as string;

    try {
      if (password !== passwordConfirm) {
        console.log("Passwords do not match");
        return;
      }

      await usersColl.create({
        username: name,
        email,
        emailVisibility: false,
        password,
        passwordConfirm,
      });
      console.log("Successfully created Account");
      redirect("/login");
    } catch (err) {
      console.error(err);
    }
  }

  async function login(formData: FormData) {
    const nameOrEmail = formData.get("nameOrEmail") as string;
    const password = formData.get("password") as string;

    try {
      await usersColl.authWithPassword(nameOrEmail, password);
      console.log("Successfully logged in");
      redirect("/");
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <>
      <div className="flex flex-col items-center">
        <h1 className="text-2xl mb-4">{isLogin ? "Log In" : "Sign Up"}</h1>
        <form action={handleSubmit}>
          {!isLogin && (
            <input type="text" placeholder="Username" name="name" required />
          )}
          {!isLogin && (
            <input type="text" placeholder="Email" name="email" required />
          )}
          <input
            type="text"
            placeholder={isLogin ? "Username/Email" : "Password"}
            name={isLogin ? "nameOrEmail" : "password"}
            required
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            required
          />
          {!isLogin && (
            <input
              type="password"
              placeholder="Confirm Password"
              name="passwordConfirm"
              required
            />
          )}
          <button type="submit">{isLogin ? "Log In" : "Create Account"}</button>
        </form>

        <p className="mt-4">
          {isLogin ? "Don't have an account?" : "Already have an account?"}
        </p>
        <button
          className="text-blue-500 mt-2"
          onClick={() => setIsLogin(!isLogin)}
        >
          {isLogin ? "Create one here!" : "Log in here!"}
        </button>
      </div>

      <div className="providers flex justify-center items-center w-full h-screen bg-gradient-to-br from-gray-600 to-black">
        <AuthButtons />
      </div>
    </>
  );
}
