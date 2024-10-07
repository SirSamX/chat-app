"use client";

import { useRef, useState, useEffect, useContext } from "react";
import Message, { MessageProps } from "./Message";
import Image from "next/image";
import { Button } from "./ui/button";
import { Textarea } from "@/components/ui/textarea"
import Header from '../components/Header';
import { getChatMessages, sendMessage } from "@/lib/message";
import { CurrentChat } from "@/app/page";


export default function ChatWindow() {
  const [messages, setMessages] = useState<MessageProps[]>([])
  const [filteredMessages, setFilteredMessages] = useState<MessageProps[]>([])
  const messageInput = useRef<HTMLTextAreaElement>(null)
  const [query, setQuery] = useState("")

  const selectedChat = useContext(CurrentChat)

  function sendMsg() {
    const message = messageInput.current?.value
    if (!selectedChat) console.log("sending")
    if (message == null || message.trim() == "" || selectedChat == null || messageInput.current == null) return

    messageInput.current.value = ""
    
    sendMessage(selectedChat.id, message)
      .then(async msg => {
        if (msg == null) return
        setMessages([...messages, {
          id: msg.id,
          sender: msg.user,
          date: new Date(msg.created),
          content: msg.content,
        }])
      })
      .catch(error => {
        console.error(error);
      });
  }

  function handleEnterKey(event: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      sendMsg();
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

  useEffect(() => {
    setMessages([])
    if (!selectedChat) return;
    getChatMessages(selectedChat.id)
      .then(async messages => {
      if (messages == null) return
      setMessages(messages)
    })
  }, [selectedChat]);

  return (
    <div className="w-full h-screen bg-zinc-100 dark:bg-zinc-800 p-4 flex flex-col">

      <div className="flex items-center justify-between p-2 border-b border-zinc-300 dark:border-zinc-700">
        <Header setQuery={setQuery}/>
      </div>

      {!selectedChat &&
        <div>Please select a chat to start messaging.</div>
      }

      <div className="flex-1 overflow-y-scroll p-4">
        {filteredMessages.map(({ id, sender, date, content }, index) => (
          <Message
            id={id}
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
        <Button variant="outline" onClick={() => sendMsg()} className="ml-4"><Image src={"/icons/send.svg"} width={32} height={32} alt="Send"></Image></Button>
      </div>
    </div>
  );
};
