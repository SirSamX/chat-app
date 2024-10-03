import pb, { chatsColl } from "./pocketbase";
import { RecordModel } from "pocketbase";


export async function fetchChats(): Promise<RecordModel[]> {
  return ((await chatsColl.getList()).items)
}

export async function newChat(chatName: string) {
  if (!pb.authStore.model || !chatName) return

  await chatsColl.create({
    "name": chatName,
    "members": pb.authStore.model.id,
    "archived": false
  })
}