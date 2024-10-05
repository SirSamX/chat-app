"use client";

import { useRef, useState, useEffect } from "react";
import Message, { MessageProps } from "./Message";
import Image from "next/image";
import { Button } from "./ui/button";
import { Textarea } from "@/components/ui/textarea"
import Header from '../components/Header';


export default function ChatWindow() {
  const [messages, setMessages] = useState<MessageProps[]>([])
  const [filteredMessages, setFilteredMessages] = useState<MessageProps[]>([])
  const messageInput = useRef<HTMLTextAreaElement>(null)
  const [query, setQuery] = useState("")

  function sendMessage() {
    const message = messageInput.current
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

  useEffect(() => {
    if (!query) {
      setFilteredMessages(messages);
      return;
    } 

    const filteredMessages = messages.filter((msg) =>
      msg.content.toLowerCase().includes(query.toLowerCase())
    );
  
    setFilteredMessages(filteredMessages);
  }, [query, messages]);

  return (
    <div className="w-full h-screen bg-zinc-100 dark:bg-zinc-800 p-4 flex flex-col">

      <div className="flex items-center justify-between p-2 border-b border-zinc-300 dark:border-zinc-700">
        <Header setQuery={setQuery}/>
      </div>

      <div className="flex-1 overflow-y-scroll p-4">
        {filteredMessages.map(({ sender, date, content }, index) => (
          <Message
            key={index}
            sender={sender}
            date={date}
            content={content}
          />
        ))}
      </div>

      <div className="p-2 border-t border-zinc-300 dark:border-zinc-700 flex items-center">
        <Textarea
          autoFocus
          placeholder="Type your message here."
          ref={messageInput}
          className="resize-none dark:focus-visible:ring-zinc-700 border dark:border-zinc-700 border-zinc-300 text-zinc-900 dark:text-zinc-100 text-lg"
          onKeyDown={handleEnterKey}
        />
        <Button variant="outline" onClick={sendMessage} className="ml-4"><Image src={"/icons/send.svg"} width={32} height={32} alt="Send"></Image></Button>
      </div>
    </div>
  );
};
