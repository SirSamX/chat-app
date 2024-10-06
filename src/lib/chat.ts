import pb from "./pocketbase";
import { messagesColl } from "./message";
import { getCurrentUser } from "./user";
import { createContext } from 'react';


const chatsColl = pb.collection("chats")
const CurrentChat = createContext("");

export async function getUserChats() {
  return await chatsColl.getFullList({
      filter: `members.id = "${getCurrentUser()?.id}"`,
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
    const message = await messagesColl.getFirstListItem(
      `chat = "${chatId}"`,
      { sort: "-created" }
    );
    return message ? message.content : null;
    console.log(message);
  } catch (error) {
    return null;
  }
}

async function deleteChat(chatId: string) {
  chatsColl.delete(chatId);
}
