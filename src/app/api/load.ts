import { chatsColl } from "../lib/pocketbase";

export async function loadChats() {
    await chatsColl.getList()
}