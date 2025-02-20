
import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Camera, Calendar, CheckCircle, XCircle } from "lucide-react";

const ProfilePage = () => {
  const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();
  const [selectedImg, setSelectedImg] = useState(null);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedImg(base64Image);
      await updateProfile({ profilePic: base64Image });
    };
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-[#0b0f29] text-white">
      <div className="relative bg-[#162447] p-8 rounded-lg shadow-lg w-96 flex flex-col items-center border border-blue-400/50 shadow-blue-500/50">
        
      <div className="relative w-32 h-32 mb-4">
  <img
    src={selectedImg || authUser.profilePic || "/avatar.png"}
    alt="Profile"
    className="w-32 h-32 rounded-full border-4 border-blue-500 shadow-lg object-cover"
    onError={(e) => {
      console.error("❌ Profile image failed to load:", e.target.src);
      e.target.src = "/avatar.png"; 
    }}
  />
  <label 
    htmlFor="avatar-upload"
    className={`absolute bottom-0 right-0 bg-blue-600 p-2 rounded-full cursor-pointer hover:bg-blue-700 transition ${
      isUpdatingProfile ? "animate-pulse pointer-events-none" : ""
    }`}
  >
    <Camera className="w-5 h-5 text-white" />
    <input 
      type="file" 
      id="avatar-upload" 
      className="hidden" 
      accept="image/*"
      onChange={handleImageUpload} 
      disabled={isUpdatingProfile}
    />
  </label>
</div>


        <p className="text-sm text-blue-500">
          {isUpdatingProfile ? "Uploading..." : ""} 
        </p>

        {/* User Info Section */}
        <h2 className="text-xl font-semibold">{authUser?.fullName || "John Doe"}</h2>
        <p className="text-gray-300">{authUser?.email || "johndoe@example.com"}</p>

        {/* Account Details */}
        <div className="w-full mt-6 p-4 bg-[#1b263b] rounded-lg border border-[#2a528a]">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-400 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-blue-400" />
              Member Since:
            </span>
            <span>{authUser?.createdAt ? new Date(authUser.createdAt).toLocaleDateString() : "Jan 1, 2023"}</span>
          </div>
          <div className="flex items-center justify-between">
            <span>Account Status</span>
            <span className="text-green-500">Active</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
