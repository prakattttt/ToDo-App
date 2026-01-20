import { useState } from "react";
import { FaUser, FaLock } from "react-icons/fa";
import AuthLayout from "../components/AuthLayout";
import AuthInput from "../components/AuthInput";
import { Link } from "react-router-dom";
import api from "../api.js";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const { data } = await api.post("/users/login", {
      email, password
      });
      console.log(data);
      if(data.success) {
        setTimeout(() => {
          navigate("/");
        }, 1500)
      }
    } catch (err) {
      console.log(err.response.data.message);
    }
  };

  return (
    <AuthLayout
      title="Welcome Back"
      subtitle="Sign in to continue"
      footer={
        <>
          Don’t have an account?
          <Link
            className="text-black cursor-pointer hover:underline ml-1"
            to="/register"
          >
            Sign up
          </Link>
        </>
      }
    >
      <form action={handleSubmit} className="space-y-5">
        <AuthInput
          label="Email"
          type="email"
          icon={FaUser}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
        />

        <AuthInput
          label="Password"
          type="password"
          icon={FaLock}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
        />

        <button
          type="submit"
          className="w-full h-11 bg-black text-white rounded-md transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] cursor-pointer">
          Login
        </button> 
      </form>
    </AuthLayout>
  );
};

export default LoginPage;
