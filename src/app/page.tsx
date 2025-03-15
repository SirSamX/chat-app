import Sidebar from '../components/Sidebar';
import ChatWindow from '../components/ChatWindow';
import ChatContext from "@/components/ChatContext"
import Login from './new-login/page';

export default function Home() {
  if (true) {
    return (
      <main>
        <ChatContext>
          <div className="flex text-gray-900 dark:text-zinc-100">
            <Sidebar />
            <ChatWindow />
          </div>
        </ChatContext>
      </main>
    );
  } else {
    return (
      <Login />
    );
  }
}
