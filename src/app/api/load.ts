"use server";

import pb, { chatsColl } from "../lib/pocketbase";
import { RecordModel } from "pocketbase";


export async function fetchChats(): Promise<RecordModel[]> {
  return ((await chatsColl.getList()).items)
}