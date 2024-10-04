"use client"

import { useState, useEffect, useRef } from "react"
import ChatPreview from "./ChatPreview"
import { newChat, fetchChats } from "@/lib/chats"


interface Chat {
  name: string;
  lastMessage: string;
  selected: boolean;
}

export default function Sidebar() {
  const chatNameInput = useRef<HTMLInputElement>(null)
  const [chats, setChats] = useState<Chat[]>([])

  useEffect(() => {
    fetchChats()
      .then(async result => {
        const chats = await Promise.all(result.map(async chat => {
          const lastMessage = chat.messages?.[0] || "No messages yet"
          return {
            name: chat.name,
            lastMessage,
            selected: false,
          }
        }))
        setChats(chats)
      })
      .catch(error => console.error(error))
  }, [])

  function addChat() {
    if (chatNameInput.current == null) return
    let chatName = chatNameInput.current.value
    chatName = chatName || "New Chat"
    chatNameInput.current.value = ""
    setChats([...chats, { name: chatName, lastMessage: "No messages yet", selected: true }])
    newChat(chatName)
  }

  function handleEnterKey(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      addChat()
    }
  }

  return (
    <div className="w-1/6 bg-zinc-200 dark:bg-zinc-900 h-screen p-5 overflow-y-scroll">
      <div className="flex items-center justify-between p-2 border-b border-zinc-300 dark:border-zinc-700">
        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Chats</h2>
        
        <div className="flex">
          <input
            ref={chatNameInput}
            type="text"
            placeholder="New Chat"
            className="p-1 border border-zinc-700 rounded-md bg-inherit dark:bg-inherit dark:text-zinc-100 outline-none mx-4"
            onKeyDown={handleEnterKey}
          />
        </div>
      </div>

      <div className="mt-4">
        {chats.map(({ name, lastMessage, selected }, index) => (
          <ChatPreview
            selected={selected}
            key={index}
            chatName={name}
            profilePictureUrl="/profile.jpg"
            lastMessage={lastMessage}
          />
        ))}
      </div>
    </div>
  )
}
