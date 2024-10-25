import { Chat } from "@/lib/chat";
import { getChatMessages } from "@/lib/message"
import Message, { MessageProps } from "./Message";
import { SetStateAction, Suspense, useEffect } from "react";

interface MsgWrapperProps {
    selectedChat: Chat | null
    filteredMessages: MessageProps[]
    setFilteredMessages: React.Dispatch<SetStateAction<MessageProps[]>>
}

export async function MsgWrapper({selectedChat, filteredMessages, setFilteredMessages}: MsgWrapperProps) {
    if (!selectedChat) {
        return null;
    }
    return(
        // filteredMessages.map(({ id, sender,senderName, date, content }, index) => (
        //     <Message
        //       id={id}
        //       key={index}
        //       sender={sender}
        //       senderName={senderName}
        //       date={date}
        //       content={content}
        //     />
        // ))
        <div>
        
            {filteredMessages.map(({ id, sender,senderName, date, content }, index) => (
                <Message
                id={id}
                content={content}
                date={date}
                sender={sender}
                senderName={senderName}
                key={index}>
                </Message>
            ))}
            {/* <Suspense fallback={<MsgSkeleton></MsgSkeleton>}>
                <Message content="Ello" date={new Date()} id="1" sender="self" senderName="EnderMo"></Message>
                <Message content="Ello" date={new Date()} id="2" sender="self" senderName="EnderMo"></Message>
                <Message content="Ello" date={new Date()} id="3" sender="self" senderName="EnderMo"></Message>
                <Message content="Ello" date={new Date()} id="4" sender="self" senderName="EnderMo"></Message>
            </Suspense> */}
        </div>
    )
}