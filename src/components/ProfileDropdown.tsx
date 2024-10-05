"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {DropdownMenu, DropdownMenuContent, DropdownMenuSeparator,DropdownMenuTrigger, DropdownMenuItem, DropdownMenuLabel} from "@/components/ui/dropdown-menu"
import Link from "next/link";
import { useState, useEffect } from "react";
import pb from "@/lib/pocketbase";
import { useRouter } from "next/navigation";


interface DropdownMenuProps {
  isAuthenticated: boolean;
  logout: () => void;
}

export default function ProfileDropdownMenu({ isAuthenticated, logout }: DropdownMenuProps) {
  const [name, setName] = useState("Login");
  const [darkMode, setDarkMode] = useState(true)

  const router = useRouter()

  useEffect(() => {
    setName(pb.authStore.model?.username ?? "Login");
  }, [])

  function getAvatarImage() {
    if (isAuthenticated) {
      return `https://github.com/${pb.authStore.model?.username}.png`;
    } else {
      return "/profile.jpg";
    }
  }

  function toggleTheme() {
    setDarkMode(!darkMode)
    if(!darkMode) {
      localStorage.setItem("theme", "light")
    }
    else {
      localStorage.setItem("theme", "dark")
    }
    console.log(localStorage.getItem("theme"))
    console.log(darkMode)
  }
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <div className="flex items-center gap-2">
            <Avatar>
              <AvatarImage src={getAvatarImage()} />
              <AvatarFallback>CN</AvatarFallback> {/*TODO: First letters of name*/}
            </Avatar>
            <span className="hidden md:block text-black dark:text-white">{name}</span>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          {!isAuthenticated && (
            <>
              <DropdownMenuItem>
                <Link href={"/login"}>
                  Login
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
            </>
          )}
          {isAuthenticated && (
            <>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link href={"/user/SirSam"}>
                  Profile
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href={"/settings"}>
                  Settings
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
            </>
          )}
          <DropdownMenuItem>
            <Link href={"https://chatap.pockethost.io/_/"}>
              PocketBase
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <button onClick={toggleTheme}>Toggle Theme</button>
          </DropdownMenuItem>
          {isAuthenticated && (
            <>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={logout}>
                Log Out
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}