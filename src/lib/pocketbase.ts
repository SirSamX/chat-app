import PocketBase from "pocketbase";


const url = "https://chatap.pockethost.io/"
const pb = new PocketBase(url)
pb.autoCancellation(false)
export default pb
