"use client"

import { useState, useEffect, useRef } from "react"
import ChatPreview from "./ChatPreview"
import { newChat, fetchChats } from "@/app/lib/chats"

interface Chat {
  name: string
  lastMessage: string
}

export default function Sidebar() {
  const chatNameInput = useRef<HTMLInputElement>(null)
  const [chats, setChats] = useState<Chat[]>([])

  useEffect(() => {
    fetchChats()
      .then(async result => {
        const chats = await Promise.all(result.map(async chat => {
          const lastMessage = chat.messages?.[0] || "No messages yet"
          console.log(chat)
          return {
            name: chat.name,
            lastMessage
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
    setChats([...chats, { name: chatName, lastMessage: "No messages yet" }])
    newChat(chatName)
  }

  return (
    <div className="w-1/6 bg-gray-100 dark:bg-gray-800 h-screen p-5 overflow-y-scroll">
      <div className="flex items-center justify-between p-2 border-b border-gray-300 dark:border-gray-700">
        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Chats</h2>
        
        <div>
          <input
            ref={chatNameInput}
            type="text"
            placeholder="New Chat"
            className="p-1 border rounded-md dark:bg-gray-800 dark:text-gray-100 outline-none mr-4"
          />
          <button
            className="text-gray-600 dark:text-gray-400"
            onClick={addChat}
          >
            +
          </button>
        </div>
      </div>

      <div className="mt-4">
        {chats.map((chat, index) => (
          <ChatPreview
            key={index}
            chatName={chat.name}
            profilePictureUrl="/profile.jpg"
            lastMessage={chat.lastMessage}
          />
        ))}
      </div>
    </div>
  )
}
