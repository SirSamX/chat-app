import Sidebar from '../components/Sidebar';
import ChatWindow from '../components/ChatWindow';
import Header from '../components/Header';

export default function Home() {
  return (
    <main>

      <Header />
      
      <div className="flex flex-1">
        <Sidebar />
        <ChatWindow />
      </div>

    </main>
  );
}
