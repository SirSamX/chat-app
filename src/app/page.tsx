import Sidebar from '../components/Sidebar';
import ChatWindow from '../components/ChatWindow';
import Header from '../components/Header';
import SignIn from '@/components/SignIn';

export default function Home() {
  return (
    <main>  
      <div className="flex">
        <Header />
        <Sidebar />
        <ChatWindow />
      </div>
    </main>
  );
}
