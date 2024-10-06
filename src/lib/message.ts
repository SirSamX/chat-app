import pb from "./pocketbase";
import { getCurrentUser } from "./user";


export const messagesColl = pb.collection("messages")

export async function sendMessage(chatId: string, content: string) {
    const user = getCurrentUser();
    if (!user) return

    await messagesColl.create({
        chat_id: chatId,
        user_id: user.id,
        content,
    });
}

async function getChatMessages(chatId: string) {
    return await messagesColl.getFullList({
        filter: `chat = "${chatId}"`,
        sort: "-created",
    });
}

async function deleteMessage(messageId: string) {
    await messagesColl.delete(messageId);
}
