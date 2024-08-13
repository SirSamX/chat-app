"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import pb from "@/app/lib/pocketbase";
import { useRouter } from "next/navigation";


export default function Header() {
  const router = useRouter()
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(!!pb.authStore.model)
  const [name, setName] = useState("");

  useEffect(() => {
    setName(pb.authStore.model?.username ?? "");
  }, [])
  
  useEffect(() => {
    const unsubscribe = pb.authStore.onChange(() => {
      setIsAuthenticated(!!pb.authStore.model)
    })
    return () => unsubscribe()
  }, [])

  function toggleDropdown() {
    setIsDropdownOpen(!isDropdownOpen)
  }

  function logout() {
    pb.authStore.clear()
    setIsDropdownOpen(false)
    router.refresh()
  }

  return (
    <>
    <div className="w-1/3 left-1/2 -translate-x-1/2 h-auto border-solid border-2 border-sky-500 p-4 flex items-center justify-between absolute top-0">
      <Link href={"/"} className="text-2xl font-bold text-black dark:text-white">Chat App</Link>
      <div className="flex items-center space-x-4">
        <div className="relative">
          <button onClick={toggleDropdown} className="flex items-center space-x-2 text-white focus:outline-none">
            <Image
              src="/profile.jpg"
              className="rounded-full"
              alt="Profile"
              width={32}
              height={32}
              priority={true}
            />
            <span className="hidden md:block text-black dark:text-white">{name}</span>
          </button>

          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 shadow-lg rounded-md z-10">
              <div className="py-1">
                {!isAuthenticated && (
                  <Link href={"/login"}><button className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 w-full text-left hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none">
                    Log In
                  </button></Link>
                )}
                <button className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 w-full text-left hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none">
                  Settings
                </button>
                <Link href={"https://chatap.pockethost.io/_/"} className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 w-full text-left hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none">
                  PocketBase
                </Link>
                {isAuthenticated && (
                  <button className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 w-full text-left hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none" onClick={logout}>
                    Log Out
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
    </>
  )
};
