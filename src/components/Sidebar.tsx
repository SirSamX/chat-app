export default function Sidebar() {
  return (
    <div className="w-1/4 bg-gray-100 dark:bg-gray-800 h-screen p-4">
      <div className="flex items-center justify-between p-2 border-b border-gray-300 dark:border-gray-700">
        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Chats</h2>
        <button className="text-gray-600 dark:text-gray-400">+</button>
      </div>

      <div className="mt-4">
        <div className="p-2 border-b border-gray-300 dark:border-gray-700 cursor-pointer text-gray-900 dark:text-gray-100">
          Chat 1
        </div>
        <div className="p-2 border-b border-gray-300 dark:border-gray-700 cursor-pointer text-gray-900 dark:text-gray-100">
          Chat 2
        </div>
      </div>
    </div>
  );
};
