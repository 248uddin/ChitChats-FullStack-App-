import { useChatStore } from "../store/useChatStore";

import Sidebar from "../components/Sidebar";
import NoChatSelected from "../components/NoChatSelected";
import ChatContainer from "../components/ChatContainer";

const HomePage = () => {
  const { selectedUser } = useChatStore();

  return (
    <div className="h-screen flex flex-col bg-[#0b0f29] text-white">
      {/* ✅ Navbar - Stays at the top */}
      <header className="w-full h-16 bg-[#1b263b] flex items-center px-4 border-b border-[#2a528a] shadow-md">
        <h1 className="text-lg font-semibold tracking-wide">ChatApp</h1>
      </header>

      {/* ✅ Main Layout - Fills Entire Screen */}
      <div className="flex flex-1 overflow-hidden">
        {/* ✅ Sidebar - Fixed Width */}
        <aside className="w-72 bg-[#162447] border-r border-[#2a528a] overflow-y-auto">
          <Sidebar />
        </aside>

        {/* ✅ Chat Area - Takes Up Remaining Space */}
        <div className="flex-1 flex flex-col items-center justify-center">
          {!selectedUser ? (
            // ✅ "No Active Contacts" Message
            <div className="flex flex-col items-center text-center animate-pulse">
              <p className="text-blue-300 text-lg mt-4 drop-shadow-md">
                Your contacts have not been very active recently...
              </p>
              <p className="text-sm text-blue-500">Why not start a new conversation?</p>
            </div>
          ) : (
            <ChatContainer />
          )}
        </div>
      </div>
    </div>

  );
};
export default HomePage;