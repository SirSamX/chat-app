import { MessageProps } from "@/components/Message";
import pb from "./pocketbase";
import { getCurrentUser } from "./user";


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
    const messages = await messagesColl.getFullList({
        filter: `chat = "${chatId}"`,
        sort: "-created",
    });
    return messages.map((msg): MessageProps => ({
        id: msg.id,
        content: msg.content,
        sender: msg.user,
        date: new Date(msg.created),
    }))
}

export async function deleteMessage(messageId: string) {
    await messagesColl.delete(messageId);
}
