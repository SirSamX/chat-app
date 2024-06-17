"use client";

import { useEffect, useRef, useState } from "react";
import Message, { MessageProps } from "./Message";


export default function ChatWindow() {
  const [messages, setMessages] = useState<MessageProps[]>([])
  const inputElement = useRef<HTMLInputElement>(null)

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

  return (
    <div className="w-5/6 bg-white dark:bg-gray-900 overflow-y-scroll p-4 flex flex-col">

      <div className="flex items-center justify-between p-2 border-b border-gray-300 dark:border-gray-700">
        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Chat Name</h2>
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
        <input
          type="text"
          className="flex-1 p-2 border rounded-md dark:bg-gray-800 dark:text-gray-100 outline-none"
          placeholder="Message"
          ref={inputElement}
        />
        <button
          className="ml-2 p-2 bg-blue-500 text-white rounded-md dark:bg-blue-700"
          onClick={sendMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
};
