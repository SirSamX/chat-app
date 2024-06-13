interface ChatPreviewProps {
    chatName: string;
}

export default function ChatPreview({ chatName }: ChatPreviewProps) {
    return (
        <div className="p-2 border-b border-gray-300 dark:border-gray-700 cursor-pointer text-gray-900 dark:text-gray-100">
          {chatName}
        </div>
    )
}