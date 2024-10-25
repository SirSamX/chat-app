import { getCurrentUser } from "@/lib/user";

export default function Settings() {
  const user = getCurrentUser();
  
  return (
    <main className="h-screen bg-zinc-200 dark:bg-zinc-900 text-gray-900 dark:text-zinc-100 flex justify-center items-center">
      <div className="w-1/2 h-1/2 p-6 bg-zinc-100 dark:bg-zinc-800 border rounded-lg">
        <p className="flex justify-center text-4xl">Settings</p>
        
      </div>
    </main>
  );
}
