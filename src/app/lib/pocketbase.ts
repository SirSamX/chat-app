import PocketBase from "pocketbase";


const url = "https://chatap.pockethost.io/"
const pb = new PocketBase(url)

const chatsColl = pb.collection("chats")
export default pb
export { chatsColl }