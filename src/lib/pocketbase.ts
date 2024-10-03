import PocketBase from "pocketbase";


const url = "https://chatap.pockethost.io/"
const pb = new PocketBase(url)
pb.autoCancellation(false)
export default pb

const chatsColl = pb.collection("chats")
const usersColl = pb.collection("users")
const messagesColl = pb.collection("messages")
export { chatsColl, usersColl, messagesColl }