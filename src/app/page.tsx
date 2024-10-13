import Sidebar from '../components/Sidebar';
import ChatWindow from '../components/ChatWindow';
import ChatContext from "@/components/providers/ChatContext"


export default function Home() {
  return (
    <main>
      <ChatContext>
        <div className="flex text-gray-900 dark:text-zinc-100">
          <Sidebar/>
          <ChatWindow />
        </div>
      </ChatContext>
    </main>
  );
}
