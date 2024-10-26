import Sidebar from '../components/Sidebar';
import ChatWindow from '../components/ChatWindow';
import ChatContext from "@/components/ChatContext"
import { Suspense } from 'react';
import { MsgSkeleton } from '@/components/Skeletons';


export default function Home() {
  return (
    <main>
      <ChatContext>

        <div className="flex text-gray-900 dark:text-zinc-100">
          <Sidebar/>
          
          <Suspense fallback={<MsgSkeleton></MsgSkeleton>}>
            <ChatWindow />
          </Suspense>

        </div>

      </ChatContext>
    </main>
  );
}
