import PocketBase from "pocketbase";

const db = new PocketBase('http://127.0.0.1:8090');
const chatsColl = db.collection("test")
export default db;
export { chatsColl };