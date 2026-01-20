import { useState } from "react";
import { FaUser, FaLock } from "react-icons/fa";
import AuthLayout from "../components/AuthLayout";
import AuthInput from "../components/AuthInput";
import { Link } from "react-router-dom";
import api from "../api.js";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await api.post("/users/login", {
        email,
        password,
      });
      toast.success(data.message);
      if (data.success) {
        setTimeout(() => {
          navigate("/");
        }, 1500);
      }
    } catch (err) {
      if (err.response && err.response.data.message) {
        toast.error(err.response.data.message);
      } else {
        toast.error("Login failed. Try again!");
      }
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
      <form onSubmit={handleSubmit} className="space-y-5">
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
          className="w-full h-11 bg-black text-white rounded-md transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
        >
          Login
        </button>
      </form>
    </AuthLayout>
  );
};

export default LoginPage;
