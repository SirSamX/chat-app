
export default function ChatWindow() {
  return (
    <div className="w-3/4 bg-white dark:bg-gray-900 h-screen p-4 flex flex-col">

      <div className="flex items-center justify-between p-2 border-b border-gray-300 dark:border-gray-700">
        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Chat Name</h2>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        <div className="mb-4">
          <div className="bg-blue-200 dark:bg-blue-700 p-2 rounded-md inline-block text-gray-900 dark:text-gray-100">Hello!</div>
        </div>
        <div className="mb-4 text-right">
          <div className="bg-green-200 dark:bg-green-700 p-2 rounded-md inline-block text-gray-900 dark:text-gray-100">Hi!</div>
        </div>
      </div>

      <div className="p-2 border-t border-gray-300 dark:border-gray-700 flex items-center">
        <input
          type="text"
          className="flex-1 p-2 border rounded-md dark:bg-gray-800 dark:text-gray-100"
          placeholder="Type a message"
        />
        <button className="ml-2 p-2 bg-blue-500 text-white rounded-md dark:bg-blue-700">
          Send
        </button>
      </div>
    </div>
  );
};
