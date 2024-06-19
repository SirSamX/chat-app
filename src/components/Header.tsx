"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { handleLogin } from "@/app/lib/session";


export default function Header() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  function toggleDropdown() {
    setIsDropdownOpen(!isDropdownOpen)
  }

  return (
    <div className="w-full bg-primary dark:bg-primary-dark p-4 flex items-center justify-between">
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
            <span className="hidden md:block text-black dark:text-white">Test Dummy</span>
          </button>

          {isDropdownOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 shadow-lg rounded-md z-10">
            <div className="py-1">
              <button className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 w-full text-left hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none" onClick={handleLogin}>
                Login
              </button>
              <button className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 w-full text-left hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none">
                Settings
              </button>
              <Link href={"https://chatap.pockethost.io/_/"} className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 w-full text-left hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none">
                PocketBase
              </Link>
              <button className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 w-full text-left hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none">
                Logout
              </button>
            </div>
          </div>
          )}
        </div>
      </div>
    </div>
  )
};
