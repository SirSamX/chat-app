"use client"

import React, { useState } from "react";
import AuthButtons from "@/components/AuthBtns";
import { usersColl } from "@/lib/user";
import { useRouter } from "next/navigation";

export default function Login() {
  const [error, setError] = useState("");
  const router = useRouter();

  async function login(formData: FormData) {
    const nameOrEmail = formData.get("nameOrEmail") as string;
    const password = formData.get("password") as string;

    if (!nameOrEmail || !password) {
      setError("Bitte füllen Sie alle Felder aus.");
      return;
    }

    try {
      await usersColl.authWithPassword(nameOrEmail, password);
      console.log("Successfully logged in");
      router.push("/"); // Verwenden Sie router.push statt redirect
    } catch (err) {
      console.error(err);
      if (err instanceof Error) {
        setError(err.message || "Anmeldung fehlgeschlagen. Bitte überprüfen Sie Ihre Eingaben.");
      } else {
        setError("Ein unbekannter Fehler ist aufgetreten.");
      }
    }
  }

  return (
    <>
      <form action={login}>
        <input type="text" placeholder="Username/Email" name="nameOrEmail" required />
        <input type="password" placeholder="Password" name="password" required />
        <button type="submit">Log In</button>
      </form>

      {error && <p className="error">{error}</p>}

      <div className="providers flex justify-center items-center w-full h-screen bg-gradient-to-br from-gray-600 to-black">
        <AuthButtons />
      </div>
    </>
  );
}
