"use client";

import { useState, useEffect } from "react";
import pb from "@/lib/pocketbase";
import { useRouter } from "next/navigation";
import ProfileDropdown from "@/components/ProfileDropdown";
import Image from "next/image";
import { getCurrentUser, logout, getIsAuthenticated } from "@/lib/user";


interface HeaderProps {
  setQuery: (value: any) => any;
}

export default function Header({ setQuery }: HeaderProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(!!getCurrentUser())
  const router = useRouter()
  
  useEffect(() => {
    return () => {pb.authStore.onChange(() => {
      setIsAuthenticated(getIsAuthenticated())
    })}
  }, [])

  return (
    <div className={`flex items-center justify-between w-full`}>
      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Chat Name</h2>

      <div className="flex w-1/2">

        <input
          onChange={(e) => setQuery(e.target.value)}
          type="text"
          placeholder="Search"
          className="p-1 rounded-md border bg-inherit dark:bg-inherit mr-4 text-zinc-900 dark:text-zinc-100 w-full text-center outline-none"
        />

        <Image src={"/icons/search.svg"} width={32} height={32} alt="Search" />

      </div>

      <div className="flex items-center space-x-4">
        <ProfileDropdown isAuthenticated={isAuthenticated} logout={() => {
          logout()
          router.refresh()
        }}/>
      </div>

    </div>
  )
};
