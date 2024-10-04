"use client";

import Image from "next/image";

interface ChatPreviewProps {
  chatName: string;
  profilePictureUrl: string;
  lastMessage: string;
  selected: boolean;
}

export default function ChatPreview({ chatName, profilePictureUrl, lastMessage, selected }: ChatPreviewProps) {
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
          <span className="text-zinc-900 dark:text-zinc-100">{chatName}</span>
          {lastMessage && <span className="text-zinc-600 dark:text-zinc-400">{lastMessage}</span>}
        </div>
      </div>
    </div>
  )
}