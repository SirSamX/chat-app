import pb from "../lib/pocketbase"
import { chatsColl } from "../lib/pocketbase"


export async function saveChats(chatName: string) {
  await chatsColl.create({
    "name": chatName
  })
}