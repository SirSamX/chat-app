"use client";

import { useRef, useState } from "react";
import ChatPreview from "./ChatPreview";


export default function Sidebar() {
  const [chats, setChats] = useState(["maurice", "jarekschwanz", "blubbeere", "määckerziege crush von jarekschwanz"])

  function addChat() {
    const chatName = "Chat " + (chats.length + 1)
    setChats([...chats, chatName])
  }

  return (
    <div className="w-1/4 bg-gray-100 dark:bg-gray-800 h-screen p-4">
      <div className="flex items-center justify-between p-2 border-b border-gray-300 dark:border-gray-700">
        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Chats</h2>
        
        <button
          className="text-gray-600 dark:text-gray-400"
          onClick={addChat}>+
        </button>
      </div>

      <div className="mt-4 test">

        {chats.map((chat, index) => (
          <ChatPreview key={index} chatName={chat} />
        ))}
        
      </div>
    </div>
  );
};
