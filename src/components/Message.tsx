export interface MessageProps {
  sender: string;
  date: Date;
  content: string;
}

export default function Message({ sender, date, content }: MessageProps) {
  if (sender == "self") {
    return (
      <div className="mb-4 text-right">
        <div className="bg-green-200 dark:bg-green-700 p-2 rounded-md inline-block text-gray-900 dark:text-zinc-100">{date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}: {content}</div>
      </div>
    )
  } else {
    return (
      <div className="mb-4">
        <div className="bg-blue-200 dark:bg-blue-700 p-2 rounded-md inline-block text-gray-900 dark:text-zinc-100">{date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}: {content}</div>
      </div>
    )
  }
}
