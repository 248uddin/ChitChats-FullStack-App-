import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });

  const navigate = useNavigate();
  const { login, isLoggingIn } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(formData, navigate);
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center relative overflow-hidden bg-[#0b0f29]">

    

      {/* Login Box with Glow Effect */}
      <div className="relative z-10 bg-[#162447] p-8 rounded-lg shadow-lg w-96 flex flex-col items-center border border-blue-400/50 shadow-blue-500/50">
        <h2 className="text-white text-2xl font-semibold mb-4">Welcome Back</h2>
        <p className="text-white text-sm mb-4">Log in to continue</p>

        <form className="w-full" onSubmit={handleSubmit}>
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

          {/* Forgot Password Link */}
          <div className="w-full text-right mb-4">
            <Link to="/forgot-password" className="text-white text-sm hover:underline">
              Forgot Password?
            </Link>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full p-3 bg-[#1f4068] text-white rounded-md hover:bg-[#2a528a] transition"
            disabled={isLoggingIn}
          >
            {isLoggingIn ? "Logging in..." : "Log In"}
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
        {/* Signup Link */}
        <p className="text-white text-sm mt-4">
          Don't have an account? <Link to="/signup" className="underline">Sign Up</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
