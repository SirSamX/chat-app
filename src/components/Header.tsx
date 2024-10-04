"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import pb from "@/lib/pocketbase";
import { useRouter } from "next/navigation";
import ProfileDropdown from "@/components/ProfileDropdown";


export default function Header() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(!!pb.authStore.model)
  
  useEffect(() => {
    const unsubscribe = pb.authStore.onChange(() => {
      setIsAuthenticated(!!pb.authStore.model)
    })
    return () => unsubscribe()
  }, [])

  function logout() {
    pb.authStore.clear()
    router.refresh()
  }

  return (
    <>
      <div className="w-1/3 left-1/2 -translate-x-1/2 h-auto border-solid border-2 p-4 flex items-center justify-between absolute top-0">
        <Link href={"/"} className="text-2xl font-bold text-black dark:text-white">Chat App</Link>
        <div className="flex items-center space-x-4">
            <ProfileDropdown isAuthenticated={isAuthenticated} logout={logout}/>
        </div>
      </div>
    </>
  )
};
