import { getCurrentUser } from "@/lib/user";


export interface MessageProps {
  id: string;
  sender: string;
  date: Date;
  content: string;
}

export default function Message({ id, sender, date, content }: MessageProps) {
  const currentUser = getCurrentUser();

  if (currentUser && sender == currentUser.id) {
    return (
      <div className="mb-4 text-right">
        <div
         className="bg-green-300 dark:bg-green-700 p-2 rounded-md inline-block text-gray-900 dark:text-zinc-100 text-left min-w-20"
        >
          <p className="text-lg">{content}</p>
          <p className="text-sm text-right">{date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
        </div>
      </div>
    )
  } else {
    return (
      <div className="mb-4">
        <div
         className="bg-blue-300 dark:bg-blue-700 p-2 rounded-md inline-block text-gray-900 dark:text-zinc-100 min-w-20"
        >
          <p className="text-lg">{content}</p>
          <p className="text-sm text-right">{date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
        </div>
      </div>
    )
  }
}
