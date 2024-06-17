"use server";

import pb, { chatsColl } from "./pocketbase";
import { RecordModel } from "pocketbase";


export async function fetchChats(): Promise<RecordModel[]> {
  return ((await chatsColl.getList()).items)
}

export async function saveChats(chatName: string) {
  await chatsColl.create({
    "name": chatName
  })
}