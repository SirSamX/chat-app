"use client";

import Sidebar from '../components/Sidebar';
import ChatWindow from '../components/ChatWindow';
import { Chat } from '@/lib/chat';
import { useState } from 'react';
import { createContext } from 'react';


export const CurrentChat = createContext<Chat | null>(null)

export default function Home() {
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);

  return (
    <main>
      <CurrentChat.Provider value={selectedChat}>
        <div className="flex">
          <Sidebar setSelectedChat={setSelectedChat}/>
          <ChatWindow />
        </div>
      </CurrentChat.Provider>
    </main>
  );
}
