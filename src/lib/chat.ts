import pb from "./pocketbase";
import { messagesColl } from "./message";
import { getCurrentUser } from "./user";


export const chatsColl = pb.collection("chats")

export interface Chat {
  id: string;
  name: string;
}

export async function getUserChats() {
  return await chatsColl.getFullList({
      filter: `members.id ?= "${getCurrentUser()?.id}"`,
  });
}

export async function createChat(name: string) {
  if (!getCurrentUser() || !name) return

  return await chatsColl.create({
    name,
    members: getCurrentUser()?.id,
  })
}

export async function getChatDetails(chatId: string) {
  return await chatsColl.getOne(chatId);
}

export async function getLastMessage(chatId: string) {
  try {
    const message = await messagesColl.getList(1, 1,
      { sort: "-created", filter: `chat = "${chatId}"`}
    );
    return message ? message.items[0].content : null;
  } catch (error) {
    return null;
  }
}

export async function deleteChat(chatId: string) {
  chatsColl.delete(chatId);
}
