import Sidebar from '../components/Sidebar';
import ChatWindow from '../components/ChatWindow';
import Header from '../components/Header';

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
