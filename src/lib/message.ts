import { MessageProps } from "@/components/Message";
import pb from "./pocketbase";
import { getCurrentUser } from "./user";
import { RecordModel } from "pocketbase";


export const messagesColl = pb.collection("messages")

export async function sendMessage(chatId: string, content: string) {
    const user = getCurrentUser();
    if (!user) return

    return await messagesColl.create({
        chat: chatId,
        user: user.id,
        content: content,
    });
}

export async function getChatMessages(chatId: string) {
    const messages = await messagesColl.getFullList(200, {
        filter: `chat = "${chatId}"`,
        sort: "-created",
        expand: "user"
    });
    return messages.map(formatMessage);
}

export function formatMessage(msg: RecordModel): MessageProps {
    return {
        id: msg.id,
        content: msg.content,
        sender: msg.user,
        senderName: msg.expand?.user.username || "Deleted User",
        date: new Date(msg.created),
    };
}

export async function deleteMessage(messageId: string) {
    await messagesColl.delete(messageId);
}
