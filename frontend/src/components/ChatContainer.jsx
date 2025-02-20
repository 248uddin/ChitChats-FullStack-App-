import { useChatStore } from "../store/useChatStore";
import { useEffect, useRef } from "react";

import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageSkeleton from "./skeletons/MessageSkeleton";
import { useAuthStore } from "../store/useAuthStore";
import { formatMessageTime } from "../lib/utils";

const ChatContainer = () => {
  const {
    messages,
    getMessages,
    isMessagesLoading,
    selectedUser,
    subscribeToMessages,
    unsubscribeFromMessages,
  } = useChatStore();
  const { authUser } = useAuthStore();
  const messageEndRef = useRef(null);

  useEffect(() => {
    getMessages(selectedUser._id);

    subscribeToMessages();

    return () => unsubscribeFromMessages();
  }, [selectedUser._id, getMessages, subscribeToMessages, unsubscribeFromMessages]);

  useEffect(() => {
    if (messageEndRef.current && messages) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  if (isMessagesLoading) {
    return (
      <div className="flex flex-col h-screen w-full bg-[#0f172a]">
        <ChatHeader />
        <div className="flex-1 px-4 py-4 space-y-4">
          <MessageSkeleton />
        </div>
        <div className="sticky bottom-0 w-full bg-[#0f172a] p-4 border-t border-[#2a528a] z-10">
          <MessageInput />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] w-full bg-[#0f172a]">
      
      {/* Fixed Chat Header - Always Visible */}
      <ChatHeader />

      {/* Messages List - Scrollable & Responsive */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message._id}
            className={`flex items-end gap-3 ${
              message.senderId === authUser._id ? "justify-end" : "justify-start"
            }`}
          >
            {/* Receiver's Profile Picture */}
            {message.senderId !== authUser._id && (
              <img
                src={
                  selectedUser?.profilePic
                    ? selectedUser.profilePic.startsWith("http")
                      ? selectedUser.profilePic
                      : `http://localhost:5001${selectedUser.profilePic}`
                    : "/avatar.png"
                }
                alt="profile pic"
                className="w-8 h-8 rounded-full border border-gray-500 object-cover"
                onError={(e) => {
                  e.target.src = "/avatar.png";
                }}
              />
            )}

            {/* Message Bubble */}
            <div
              className={`max-w-[70%] px-4 py-2 rounded-lg text-white ${
                message.senderId === authUser._id ? "bg-blue-600" : "bg-gray-700"
              }`}
            >
              {message.image && (
                <img
                  src={message.image}
                  alt="Attachment"
                  className="sm:max-w-[200px] rounded-md mb-2"
                />
              )}
              {message.text && <p>{message.text}</p>}
              <div className="text-xs opacity-50 mt-1">
                {formatMessageTime(message.createdAt)}
              </div>
            </div>

            {/* Sender's Profile Picture */}
            {message.senderId === authUser._id && (
              <img
                src={
                  authUser?.profilePic
                    ? authUser.profilePic.startsWith("http")
                      ? authUser.profilePic
                      : `http://localhost:5001${authUser.profilePic}`
                    : "/avatar.png"
                }
                alt="profile pic"
                className="w-8 h-8 rounded-full border border-gray-500 object-cover"
                onError={(e) => {
                  e.target.src = "/avatar.png";
                }}
              />
            )}
          </div>
        ))}

        {/* Empty div to force scroll to bottom */}
        <div ref={messageEndRef}></div>
      </div>

      {/* Fixed Message Input at Bottom */}
      <div className="bg-[#0f172a] p-4 border-t border-[#2a528a]">
        <MessageInput />
      </div>
    </div>
  );
};
export default ChatContainer;
