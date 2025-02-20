import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { LogOut, MessageSquare, Settings, User } from "lucide-react";

const Navbar = () => {
  const { logout, authUser } = useAuthStore();

  return (
   <header
   className="fixed top-0 w-full z-40 backdrop-blur-lg border-b border-[#1f4068] 
   bg-gradient-to-b from-[#102030] to-[#0b0f29] shadow-lg"
 >
   <div className="absolute inset-x-0 top-full h-2 bg-blue-500 opacity-50 blur-lg"></div>
   
   <div className="container mx-auto px-4 h-16 flex items-center justify-between">
     {/* Left Side - Logo */}
     <Link
       to=""
       className="flex items-center gap-2.5 transition-all hover:scale-105 duration-200"
     >
       <div className="size-10 rounded-lg bg-[#1f4068] flex items-center justify-center shadow-inner border border-[#2a528a]">
         <MessageSquare className="w-6 h-6 text-white" />
       </div>
       <h1 className="text-lg font-bold text-white tracking-widest drop-shadow-lg">ChitChats</h1>
     </Link>
 
     {/* Right Side - Buttons */}
     <div className="flex items-center gap-3">
       <Link
         to={"/settings"}
         className="px-4 py-1 bg-[#1f4068] text-white border border-[#2a528a] 
         rounded-md shadow-md transition-all hover:bg-[#2a528a] hover:shadow-blue-500/50"
       >
         <Settings className="w-4 h-4 inline-block" /> 
         <span className="hidden sm:inline">Settings</span>
       </Link>
 
       {authUser && (
         <>
           <Link
             to={"/profile"}
             className="px-4 py-1 bg-[#1f4068] text-white border border-[#2a528a] 
             rounded-md shadow-md transition-all hover:bg-[#2a528a] hover:shadow-blue-500/50"
           >
             <User className="w-4 h-4 inline-block" /> 
             <span className="hidden sm:inline">Profile</span>
           </Link>
 
           <button
             className="px-4 py-1 bg-red-600 text-white border border-red-700 rounded-md 
             shadow-md transition-all hover:bg-red-700 hover:shadow-red-500/50"
             onClick={logout}
           >
             <LogOut className="w-4 h-4 inline-block" /> 
             <span className="hidden sm:inline">Logout</span>
           </button>
         </>
       )}
     </div>
   </div>
 </header>
  );
};
export default Navbar;