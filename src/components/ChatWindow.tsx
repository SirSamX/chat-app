"use client"

import { useRef, useState, useEffect, useCallback, Suspense } from "react";
import Message, { MessageProps } from "./Message";
import Image from "next/image";
import { Button } from "./ui/button";
import { Textarea } from "@/components/ui/textarea"
import Header from '../components/Header';
import { getChatMessages, messagesColl, sendMessage } from "@/lib/message";
import { CurrentChatContextType, useChatContext } from "@/components/ChatContext";
import { RecordModel } from "pocketbase";
import { getCurrentUser } from "@/lib/user";
import { formatMessage } from "@/lib/message";
import { MsgWrapper } from "./MsgWrapper";
import { error } from "console";
import { MsgSkeleton, MsgsSkeleton } from "./Skeletons";


export default function ChatWindow() {
  const [messages, setMessages] = useState<MessageProps[]>([]);
  const [filteredMessages, setFilteredMessages] = useState<MessageProps[]>([]);
  const messageInput = useRef<HTMLTextAreaElement>(null);
  const [query, setQuery] = useState("");
  const { selectedChat, setSelectedChat } = useChatContext() as CurrentChatContextType;
  const [isLoading, setIsLoading] = useState(false);
  
  const updateMessages = useCallback((msg: RecordModel) => {
    setMessages((prevMessages) => [formatMessage(msg), ...prevMessages]);
  }, []);  

  function sendMsg() {
    const message = messageInput.current?.value
    if (message == null || message.trim() == "" || selectedChat == null || messageInput.current == null) return

    messageInput.current.value = ""

    sendMessage(selectedChat.id, message)
      .then(async msg => {
        if (msg == null) return
        updateMessages(msg)
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
    setIsLoading(true)
    // async function fetchMessages() {
    //   // Simulieren Sie hier das Laden Ihrer Nachrichten
    //   await new Promise(resolve => setTimeout(resolve, 5000));
    //   setMessages([{content: "Ello", date: new Date(), id: "1", sender: "self", senderName: "EnderMo23"}]);
    //   setIsLoading(false);
    // }
    // fetchMessages()
    const user = getCurrentUser();
    if (!selectedChat || !user) {
      setIsLoading(false)
      return
    };

    // setIsLoading(true)
    setMessages([])

    getChatMessages(selectedChat.id)
    .then(async messages => {
      if(messages == null) return;
      setMessages(messages)
    })
    .catch((error) => console.error(error))
    .finally(() => setIsLoading(false));
    
    
      messagesColl.subscribe('*', 
        (e) => {
          const msg = e.record
          updateMessages(msg)
        },
        { filter: `chat = "${selectedChat.id}" && user != "${user.id}"` }
      );

    return () => {
      messagesColl.unsubscribe('*')
    };
  }, [selectedChat, updateMessages]);
  if(isLoading) {
    throw new Promise(resolve => setTimeout(resolve, 5000))
  }

  return (
    <div className="w-full h-screen bg-zinc-100 dark:bg-zinc-800 p-4 flex flex-col">

      <div className="flex items-center justify-between p-2 border-b border-zinc-300 dark:border-zinc-700">
        <Header setQuery={setQuery}/>
      </div>

      {!selectedChat &&
        <div className="h-screen flex items-center justify-center text-gray-900 dark:text-zinc-100 text-2xl">
          <p>Please select a chat to start messaging.</p>
        </div>
      }


      <div className="flex grow flex-col-reverse overflow-y-scroll p-4">
          {filteredMessages.map(({ id, sender, senderName, date, content }, index) => (
            <Message
              id={id}
              key={index}
              sender={sender}
              senderName={senderName}
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
