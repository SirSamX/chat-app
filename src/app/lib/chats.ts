"use server";

import { chatsColl } from "./pocketbase";
import { RecordModel } from "pocketbase";


export async function fetchChats(): Promise<RecordModel[]> {
  return ((await chatsColl.getList()).items)
}

export async function newChat(chatName: string) {
  await chatsColl.create({
    "name": chatName,
    "members": [""],
    "messages": chatName
  })
}