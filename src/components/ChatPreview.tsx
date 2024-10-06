"use client";


import { getLastMessage } from "@/lib/chat";
import Image from "next/image";
import { useState, useEffect } from "react"

export interface ChatPreviewProps {
  id: string;
  name: string;
  profilePictureUrl: string | null;
  selected: boolean;
}

export default function ChatPreview({ id, name, profilePictureUrl, selected }: ChatPreviewProps) {
  const [lastMessage, setLastMessage] = useState<string | null>(null)

  useEffect(() => {
    getLastMessage(id).then(message => {
      setLastMessage(message)
    })
  }, [id])

  return (
    <div className="py-3 border-b border-zinc-300 dark:border-zinc-700 cursor-pointer">
      <div
        className={`flex items-center p-1.5 ${
          selected ? "rounded-2xl bg-zinc-700" : ""
        }`}
      >
        {profilePictureUrl && (
          <Image
            className="rounded-full mr-5"
            width={40}
            height={40}
            src={profilePictureUrl}
            alt="Profile Picture"
          />
        )}

        <div className="flex flex-col">
          <span className="text-zinc-900 dark:text-zinc-100">{name}</span>
          {lastMessage && <span className="text-zinc-600 dark:text-zinc-400">{lastMessage}</span>}
        </div>
      </div>
    </div>
  )
}