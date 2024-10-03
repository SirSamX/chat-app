"use client";

import { useRef, useState } from "react";
import Message, { MessageProps } from "./Message";
import Image from "next/image";
import { Button } from "./ui/button";
import { Textarea } from "@/components/ui/textarea"


export default function ChatWindow() {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [messages, setMessages] = useState<MessageProps[]>([])
  const inputElement = useRef<HTMLTextAreaElement>(null)

  function toggleSearch() {
    setIsSearchOpen(!isSearchOpen)
  }

  function sendMessage() {
    const message = inputElement.current
    if (message == null || message.value == "") {
      return
    }
    
    setMessages([...messages, {
      sender: "self",
      date: new Date(),
      content: message.value
    }])
    message.value = ""
  }

  function handleEnterKey(event: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      sendMessage();
    }
  }

  return (
    <div className="w-5/6 bg-white dark:bg-gray-900 overflow-y-hidden p-4 flex flex-col">

      <div className="flex items-center justify-between p-2 border-b border-gray-300 dark:border-gray-700">
        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Chat Name</h2>
        <div>
          {isSearchOpen && (
            <input
              type="text"
              placeholder="Search"
              className="p-1 border rounded-md dark:bg-gray-800 dark:text-gray-100 outline-none mr-4"
            />
          )}
          <button onClick={toggleSearch}><Image src={"/icons/search.svg"} width={32} height={32} alt="Search"></Image></button>
        </div>
      </div>

      <div className="flex-1 overflow-y-scroll p-4 max-h-lvh">
        {messages.map((msg, index) => (
          <Message
            key={index}
            sender={msg.sender}
            date={msg.date}
            content={msg.content}
          />
        ))}
      </div>

      <div className="p-2 border-t border-gray-300 dark:border-gray-700 flex items-center">
        <Textarea
          autoFocus
          placeholder="Type your message here."
          ref={inputElement}
          className="resize-none"
          onKeyDown={handleEnterKey}
        />
        <Button variant="outline" onClick={sendMessage} className="ml-4">Send</Button>
      </div>
    </div>
  );
};
