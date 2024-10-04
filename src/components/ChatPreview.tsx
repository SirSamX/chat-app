import Image from "next/image";

interface ChatPreviewProps {
  chatName: string;
  profilePictureUrl: string;
  lastMessage: string;
}

export default function ChatPreview({ chatName, profilePictureUrl, lastMessage }: ChatPreviewProps) {
  return (
    <div className="p-2 py-5 flex items-center border-b border-zinc-300 dark:border-zinc-700 cursor-pointer">

      {profilePictureUrl && (
        <Image
          className="rounded-full mr-5"
          width={40}
          height={40}
          src={profilePictureUrl}
          alt="Profile Picture"
        />
      )}

      <div className="flex flex-col">
        <span className="text-gray-900 dark:text-gray-100">{chatName}</span>
        {lastMessage && <span className="text-gray-600 dark:text-gray-400">{lastMessage}</span>}
      </div>
      
    </div>
  )
}