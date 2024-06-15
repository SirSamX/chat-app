import Sidebar from '../components/Sidebar';
import ChatWindow from '../components/ChatWindow';
import Header from '../components/Header';
import SignIn from '@/components/SignIn';

export default function Home() {
  return (
    <main>

      <Header />
      
      
      <div className="flex flex-1">
        <SignIn />
        <Sidebar />
        <ChatWindow />
      </div>
      
    </main>
  );
}
