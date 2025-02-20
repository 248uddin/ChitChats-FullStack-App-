import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Eye, EyeOff, Loader2, Lock, Mail, MessageSquare, User } from "lucide-react";
import { Link } from "react-router-dom";

import AuthImagePattern from "../components/AuthImagePattern";
import toast from "react-hot-toast";

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const { signup, isSigningUp } = useAuthStore();

  const validateForm = () => {
    if (!formData.fullName.trim()) return toast.error("Full name is required");
    if (!formData.email.trim()) return toast.error("Email is required");
    if (!/\S+@\S+\.\S+/.test(formData.email)) return toast.error("Invalid email format");
    if (!formData.password) return toast.error("Password is required");
    if (formData.password.length < 6) return toast.error("Password must be at least 6 characters");

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const success = validateForm();

    if (success === true) signup(formData);
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-[#0b0f29]">
    {/* Skype Logo */}
    <h1 className="text-white text-4xl font-bold mb-6">ChitChats</h1>

    {/* Signup Box */}
    <div className="relative z-10 bg-[#162447] p-8 rounded-lg shadow-lg w-96 flex flex-col items-center border border-blue-400/50 shadow-blue-500/50">
        <h2 className="text-white text-2xl font-semibold mb-4">Create an Account</h2>

      <form className="w-full" onSubmit={handleSubmit}>
        {/* Full Name Input */}
        <div className="relative w-full mb-4">
          <User className="absolute left-3 top-3 text-gray-500" />
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            className="w-full p-3 pl-10 rounded-md text-gray-900 bg-white focus:outline-none focus:ring focus:ring-blue-300"
            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
          />
        </div>

        {/* Email Input */}
        <div className="relative w-full mb-4">
          <Mail className="absolute left-3 top-3 text-gray-500" />
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full p-3 pl-10 rounded-md text-gray-900 bg-white focus:outline-none focus:ring focus:ring-blue-300"
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
        </div>

        {/* Password Input */}
        <div className="relative w-full mb-4">
          <Lock className="absolute left-3 top-3 text-gray-500" />
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            className="w-full p-3 pl-10 rounded-md text-gray-900 bg-white focus:outline-none focus:ring focus:ring-blue-300"
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          />
          <button
            type="button"
            className="absolute right-3 top-3 text-gray-600"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>

        {/* Sign Up Button */}
        <button
          type="submit"
          className="w-full p-3 bg-[#1f4068] text-white rounded-md hover:bg-[#2a528a] transition"
          disabled={isSigningUp}
        >
          {isSigningUp ? "Signing Up..." : "Create Account"}
        </button>
      </form>

      {/* Glowing Floating Particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
  {/* Large dark blue glow */}
  <div className="absolute w-[500px] h-[500px] bg-[#0d1b2a] rounded-full opacity-40 blur-[250px] top-[-150px] left-[-100px] animate-pulse"></div>

  {/* Medium blue glow */}
  <div className="absolute w-[400px] h-[400px] bg-[#1b263b] rounded-full opacity-30 blur-[200px] bottom-[10%] right-[10%] animate-pulse"></div>

  {/* Cyan glowing light */}
  <div className="absolute w-[350px] h-[350px] bg-[#415a77] rounded-full opacity-20 blur-[150px] top-[30%] left-[30%] animate-pulse"></div>

  {/* Moving soft glow */}
  <div className="absolute w-[450px] h-[450px] bg-[#778da9] rounded-full opacity-15 blur-[300px] bottom-[20%] left-[15%] animate-pulse"></div>
</div>

      {/* Already have an account? */}
      <p className="text-white text-sm mt-4">
        Already have an account? <Link to="/login" className="underline">Sign In</Link>
      </p>
    </div>
  </div>
  );
};
export default SignUpPage;