import pb from "./pocketbase";
import { messagesColl } from "./message";
import { getCurrentUser } from "./user";
import { ListResult, RecordModel } from "pocketbase";
import { MessageProps } from "@/components/Message";


export const chatsColl = pb.collection("chats")

export interface Chat {
  id: string;
  name: string;
}

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
    
  } catch (error) {
    return null;
  }
}

async function deleteChat(chatId: string) {
  chatsColl.delete(chatId);
}



export async function fetchMsgs(chatId: string): Promise<MessageProps[]> {
  try {
    const msgs = await messagesColl.getList<RecordModel>(1, 50, {
      filter: `chat = "${chatId}"`,
      sort: "-created"
    })
    return msgs.items.map(item => 
      (console.log(item.user.email),
    {
      sender: item.user.username || "self",
      date: new Date(item.created),
      content: item.content
    }));
  }
  catch(error) {
    console.error(error);
    return [];
  }
}