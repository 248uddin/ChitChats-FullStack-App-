import { THEMES } from "../constants";
import { useThemeStore } from "../store/useThemeStore";
import { Send } from "lucide-react";

const PREVIEW_MESSAGES = [
  { id: 1, content: "Hey! How's it going?", isSent: false },
  { id: 2, content: "I'm doing great! Just working on some new features.", isSent: true },
];

const SettingsPage = () => {
  const { theme, setTheme } = useThemeStore();

  return (
    <div className="h-screen w-full flex flex-col bg-[#0b0f29] text-white px-6 pt-20">
      <div className="max-w-3xl mx-auto space-y-6">

        {/* ✅ Section Title */}
        <div className="flex flex-col gap-1">
          <h2 className="text-2xl font-semibold">Settings</h2>
          <p className="text-sm text-gray-400">Customize your chat experience</p>
        </div>

        {/* ✅ Theme Selector */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold">Theme</h3>
          <p className="text-sm text-gray-500">Choose a theme for your chat interface</p>

          <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-3">
            {THEMES.map((t) => (
              <button
                key={t}
                className={`group flex flex-col items-center gap-2 p-2 rounded-lg transition
                  ${theme === t ? "bg-[#1b263b] border border-blue-500" : "hover:bg-[#1b263b]/50"}
                `}
                onClick={() => setTheme(t)}
              >
                <div className="relative h-8 w-full rounded-md overflow-hidden" data-theme={t}>
                  <div className="absolute inset-0 grid grid-cols-4 gap-px p-1">
                    <div className="rounded bg-primary"></div>
                    <div className="rounded bg-secondary"></div>
                    <div className="rounded bg-accent"></div>
                    <div className="rounded bg-neutral"></div>
                  </div>
                </div>
                <span className="text-xs font-medium truncate w-full text-center">{t.charAt(0).toUpperCase() + t.slice(1)}</span>
              </button>
            ))}
          </div>
        </div>

        {/* ✅ Chat Preview Section */}
        <h3 className="text-lg font-semibold">Chat Preview</h3>
        <div className="rounded-xl border border-blue-500 bg-[#162447] shadow-lg p-5">
          {/* Chat Header */}
          <div className="px-4 py-3 border-b border-blue-500 bg-[#1b263b] flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-medium">
              J
            </div>
            <div>
              <h3 className="font-medium text-sm">John Doe</h3>
              <p className="text-xs text-gray-400">Online</p>
            </div>
          </div>

          {/* Chat Messages */}
          <div className="p-4 space-y-4 min-h-[200px] max-h-[200px] overflow-y-auto bg-[#0f172a]">
            {PREVIEW_MESSAGES.map((message) => (
              <div key={message.id} className={`flex ${message.isSent ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[80%] rounded-xl p-3 text-white text-sm shadow-sm
                  ${message.isSent ? "bg-blue-600" : "bg-gray-700"}
                `}>
                  <p>{message.content}</p>
                  <p className="text-[10px] mt-1 opacity-70">{message.isSent ? "12:05 PM" : "12:00 PM"}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Chat Input */}
          <div className="p-4 border-t border-blue-500 bg-[#1b263b] flex gap-2">
            <input
              type="text"
              className="w-full px-3 py-2 bg-[#0b0f29] text-white rounded-lg border border-gray-700 focus:border-blue-500 focus:outline-none text-sm"
              placeholder="Type a message..."
              value="This is a preview"
              readOnly
            />
            <button className="bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700">
              <Send size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SettingsPage;