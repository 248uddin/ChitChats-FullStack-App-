import { useEffect, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import SidebarSkeleton from "./skeletons/SidebarSkeleton";
import { Users } from "lucide-react";

const Sidebar = () => {
  const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading } = useChatStore();

  const { onlineUsers } = useAuthStore();
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const filteredUsers = showOnlineOnly
    ? users.filter((user) => onlineUsers.includes(user._id))
    : users;

  if (isUsersLoading) return <SidebarSkeleton />;

  return (
    <aside className="h-full w-72 bg-[#162447] border-r border-[#2a528a] flex flex-col shadow-md overflow-y-auto">
      {/* Sidebar Header */}
      <div className="border-b border-[#2a528a] w-full p-5 bg-[#1b263b] shadow-md flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Users className="size-6 text-blue-400" />
          <span className="font-semibold text-white">Contacts</span>
        </div>

        {/* Online Only Toggle */}
        <label className="cursor-pointer flex items-center gap-2 text-white text-sm">
          <input
            type="checkbox"
            checked={showOnlineOnly}
            onChange={(e) => setShowOnlineOnly(e.target.checked)}
            className="w-4 h-4 accent-blue-400"
          />
          Online Only
        </label>
      </div>

      {/* User List */}
      <div className="overflow-y-auto w-full py-3">
        {filteredUsers.map((user) => (
          <button
            key={user._id}
            onClick={() => setSelectedUser(user)}
            className={`
              w-full p-3 flex items-center gap-3 
              hover:bg-[#1b263b] transition-colors rounded-md mx-2
              ${selectedUser?._id === user._id ? "bg-[#1b263b] border-l-4 border-blue-400" : ""}
            `}
          >
            {/* Profile Picture */}
            <div className="relative w-12 h-12">
              <img
                src={user.profilePic || "/avatar.png"}
                alt={user.fullName}
                className="w-full h-full object-cover rounded-full border-2 border-[#2a528a]"
              />
              {onlineUsers.includes(user._id) && (
                <span className="absolute bottom-1 right-1 w-3 h-3 bg-green-500 rounded-full ring-2 ring-[#1b263b] animate-pulse" />
              )}
            </div>

            {/* User Details */}
            <div className="text-left min-w-0">
              <div className="text-white font-medium truncate">{user.fullName}</div>
              <div className={`text-sm ${onlineUsers.includes(user._id) ? "text-green-400" : "text-gray-400"}`}>
                {onlineUsers.includes(user._id) ? "Online" : "Offline"}
              </div>
            </div>
          </button>
        ))}

        {/* No Users Found */}
        {filteredUsers.length === 0 && (
          <div className="text-center text-gray-400 py-4">No users found</div>
        )}
      </div>
    </aside>
  );
};
export default Sidebar;
