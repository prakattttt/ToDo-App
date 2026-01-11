import { useState } from "react";
import { FaUser, FaLock } from "react-icons/fa";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    console.log({ email, password });
  };

  return (
    <div className="max-h-screen flex items-center justify-center px-4 mt-20">
      <div className="bg-white w-full max-w-md rounded-xl shadow-2xl p-8 transition-all duration-300 hover:shadow-[0_20px_50px_rgba(0,0,0,0.15)]">
        <h2 className="text-2xl font-semibold text-center mb-2">
          Welcome Back
        </h2>
        <p className="text-gray-500 text-center mb-6">Sign in to continue</p>

        <form action={handleSubmit} className="space-y-5">
          <div>
            <label className="text-sm text-gray-600">Email</label>
            <div className="flex items-center bg-gray-100 rounded-md mt-1 px-2 focus-within:ring-2 focus-within:ring-black transition">
              <FaUser className="text-gray-400" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-transparent w-full h-10 px-2 outline-none"
                placeholder="you@example.com"
              />
            </div>
          </div>

          <div>
            <label className="text-sm text-gray-600">Password</label>
            <div className="flex items-center bg-gray-100 rounded-md mt-1 px-2 focus-within:ring-2 focus-within:ring-black transition">
              <FaLock className="text-gray-400" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-transparent w-full h-10 px-2 outline-none"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full h-11 bg-black text-white rounded-md 
                       transition-all duration-300 
                       hover:bg-gray-900 hover:scale-[1.02]
                       active:scale-[0.98]"
          >
            Login
          </button>
        </form>

        <div className="text-center mt-6 text-sm text-gray-500">
          Don’t have an account?{" "}
          <span className="text-black cursor-pointer hover:underline ml-1">
            Sign up
          </span>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
