import { X } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";

const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();

  return (
    <div className="sticky top-0 left-0 w-full h-16 bg-[#1b263b] flex items-center px-6 border-b border-[#2a528a] shadow-md z-50">
      
      {/* User Info Section */}
      <div className="flex items-center gap-4">
        
        {/* Profile Picture */}
        <div className="w-12 h-12 rounded-full border border-gray-500 overflow-hidden">
          <img
            src={
              selectedUser?.profilePic
                ? selectedUser.profilePic.startsWith("http")
                  ? selectedUser.profilePic
                  : `http://localhost:5001${selectedUser.profilePic}`
                : "/avatar.png"
            }
            alt={selectedUser?.fullName || "User"}
            className="object-cover w-full h-full"
            onError={(e) => {
              console.error("❌ Failed to load profile pic:", e.target.src);
              e.target.src = "/avatar.png"; // Fallback to default avatar
            }}
          />
        </div>

        {/* User Name & Online Status */}
        <div>
          <h3 className="text-white font-semibold text-lg">
            {selectedUser?.fullName || "Unknown User"}
          </h3>
          <p className={`text-sm ${onlineUsers.includes(selectedUser?._id) ? "text-green-400" : "text-gray-400"}`}>
            {onlineUsers.includes(selectedUser?._id) ? "Online" : "Offline"}
          </p>
        </div>
      </div>

      {/* Close Button (Fixed Positioning) */}
      <button
        onClick={() => setSelectedUser(null)}
        className="ml-auto p-2 text-gray-400 hover:text-red-500 transition"
        title="Exit Chat"
      >
        <X className="w-6 h-6" />
      </button>
      
    </div>
  );
};
export default ChatHeader;
