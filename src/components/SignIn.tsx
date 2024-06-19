"use client"

import { FormEvent } from "react";

export default function SignIn() {
    
    async function submit(e: FormEvent<HTMLFormElement>): Promise<void> {
        e.preventDefault()
    }

    return(

        <form onSubmit={submit} className="z-2 h-1/3 w-1/3 mt-36 shadow-[10px_35px_60px_-15px_rgba(255,10,10,10.3)] flex text-center items-center justify-center flex-col bg-slate-500 absolute left-1/2">
            <h1>SignIn to your account!</h1>
            <button type="submit">Submit</button>
        </form>

    )
}