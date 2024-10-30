"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuSeparator,DropdownMenuTrigger, DropdownMenuItem, DropdownMenuLabel } from "@/components/ui/dropdown-menu"
import { useState, useEffect } from "react";
import { redirect, useRouter } from "next/navigation";
import { getCurrentUser, logout } from "@/lib/user";
import pb from "@/lib/pocketbase";
import { revalidatePath } from "next/cache";


export default function ProfileDropdownMenu() {
  const [name, setName] = useState("Login");
  const [profilePicture, setProfilePicture] = useState("/profile.jpg")
  const router = useRouter();
  const user = getCurrentUser();
  const isAuthenticated = !!user

  const openProfilePage = () => {
    router.push(`/user/${user?.id}`);
  };

  useEffect(() => {
    if (!user) return;
    setName(user.username);
    setProfilePicture(pb.files.getUrl(user, user.avatar, {thumb: '100x100'}));
  }, [user, profilePicture]);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <div className="flex items-center gap-2">
            <Avatar>
              <AvatarImage src={profilePicture}/>
              <AvatarFallback className="outline outline-zinc-600 dark:outline-zinc-400">
                {name[0]}
              </AvatarFallback>
            </Avatar>
            <span className="hidden md:block">{name}</span>
          </div>
        </DropdownMenuTrigger>

        <DropdownMenuContent>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          {!isAuthenticated && (
            <>
              <DropdownMenuItem onClick={() => router.push("/login")}>
                Login
              </DropdownMenuItem>
              <DropdownMenuSeparator />
            </>
          )}
          {isAuthenticated && (
            <>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={openProfilePage}>
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => router.push("/settings")}>
                Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
            </>
          )}
          <DropdownMenuItem onClick={() => window.open("https://chatap.pockethost.io/_/")}>
            PocketBase
          </DropdownMenuItem>
          {isAuthenticated && (
            <>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => {
                logout();
                window.location.reload();
              }}>
                Log Out
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}
