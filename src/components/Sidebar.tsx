"use client"

import { useState, useEffect, useRef, createContext } from "react"
import ChatPreview from "./ChatPreview"
import { Chat, createChat, getUserChats } from "@/lib/chat"


interface SidebarProps {
  setSelectedChat: (chat: Chat) => void;
}

export default function Sidebar({ setSelectedChat }: SidebarProps) {
  const chatNameInput = useRef<HTMLInputElement>(null);
  const [chats, setChats] = useState<Chat[]>([]);
  const [selectedChatIndex, setSelectedChatIndex] = useState(0);
  

  useEffect(() => {
    getUserChats()
    .then(async result => {
      const chats = await Promise.all(result.map(async chat => {
        return {
          id: chat.id,
          name: chat.name,
        }
      }))

      setChats(chats)
    })
    .catch(error => {
      console.error(error);
    })
  }, [])

  useEffect(() => {
    if (chats.length > selectedChatIndex) {
      setSelectedChat(chats[selectedChatIndex]);
    }
  }, [chats, selectedChatIndex, setSelectedChat]);

  function addChat() {
    if (chatNameInput.current == null || chatNameInput.current.value.trim() == "") return
    const chatName = chatNameInput.current.value
    chatNameInput.current.value = ""

    createChat(chatName)
      .then(async result => {
        if (result?.id) {
          setChats([...chats, {
            id: result.id,
            name: chatName,
          }]);
          setSelectedChatIndex(chats.length);
        }
      })
      .catch(error => {
        console.error(error);
      });
  }

  function getSelectedChatId() {
    if (chats[selectedChatIndex]) {
      return chats[selectedChatIndex].id;
    }
    return null;
  }

  function handleEnterKey(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      addChat();
    }
  }

  return (
    <div className="w-1/6 max-w-96 min-w-56 bg-zinc-200 dark:bg-zinc-900 h-screen p-5 overflow-y-scroll">
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
        {chats.map(({ id, name }, index) => (
          <div key={id} onClick={() => setSelectedChatIndex(index)}>
            <ChatPreview
              id={id}
              name={name}
              selected={selectedChatIndex === index}
              profilePictureUrl={""}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
