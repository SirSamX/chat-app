import pb from "../lib/pocketbase";

export function logout() {
    pb.authStore.clear()
}