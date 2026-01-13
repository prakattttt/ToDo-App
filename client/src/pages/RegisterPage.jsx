import { useState } from "react";
import { FaUser, FaLock, FaUserCircle } from "react-icons/fa";
import AuthLayout from "../components/AuthLayout";
import AuthInput from "../components/AuthInput";
import { Link } from "react-router-dom";

const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    console.log({ username, email, password });
  };

  return (
    <AuthLayout
      title="Create Account"
      subtitle="Sign up to get started"
      footer={
        <>
          Already have an account?
          <Link
            className="text-black cursor-pointer hover:underline ml-1"
            to="/login"
          >
            Login
          </Link>
        </>
      }
    >
      <form action={handleSubmit} className="space-y-5">
        <AuthInput
          label="Username"
          type="text"
          icon={FaUserCircle}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="username123"
        />

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
          placeholder="Create password"
        />

        <button
          type="submit"
          className="w-full h-11 bg-black text-white rounded transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
        >
          Register
        </button>
      </form>
    </AuthLayout>
  );
};

export default RegisterPage;
