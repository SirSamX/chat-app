"use client"

import React, { useState, createContext} from "react";
import { Chat } from "@/lib/chat";


export interface CurrentChatContextType {
  selectedChat: Chat | null;
  setSelectedChat: React.Dispatch<React.SetStateAction<Chat | null>>;
}

const CurrentChat = createContext<CurrentChatContextType | null>(null)

export const useChatContext = () => {
  const chatContext = React.useContext(CurrentChat);
  if (chatContext === undefined) {
    throw new Error("useChatContext must be inside a ChatContext provider!");
  }
  return chatContext;
};

export default function ChatContext({ children }: {children: React.ReactNode}){
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);

  return (
    <CurrentChat.Provider value={{ selectedChat, setSelectedChat }}>
      {children}
    </CurrentChat.Provider>
  )
}
