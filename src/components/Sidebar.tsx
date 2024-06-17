"use client";

import { useState, useEffect, useRef } from "react";
import ChatPreview from "./ChatPreview";
import { saveChats, fetchChats } from "@/app/lib/chats";


export default function Sidebar() {
  const chatNameInput = useRef<HTMLInputElement>(null)

  useEffect(() => {
    fetchChats()
      .then(result => setChats(result.map(chat => chat.name)))
      .catch(error => console.error(error))
  }, []);

  const [chats, setChats] = useState<string[]>([])

  function addChat() {
    if (chatNameInput.current == null) return
    let chatName = chatNameInput.current.value
    chatName = chatName || "New Chat";
    chatNameInput.current.value = ""
    setChats([...chats, chatName])
    saveChats(chatName)
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
          <ChatPreview key={index} chatName={chat} profilePictureUrl="/profile.jpg" lastMessage="test last message yay" />
        ))}
        
      </div>
    </div>
  );
};
