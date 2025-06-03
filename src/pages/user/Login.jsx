import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLoginUserMutation } from "../../redux/features/auth/authApi";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/features/auth/authSlice";
import { Toaster, toast } from "sonner";
import Cookies from "js-cookie";

export default function Login() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [message, setMessage] = useState();
  const [loginUser, { isLoading: loginLoading }] = useLoginUserMutation();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();
    const data = { email, password };

    try {
      const response = await loginUser(data).unwrap();
      const { token, user } = response;
      localStorage.setItem("token", JSON.stringify(token));
      Cookies.set("token", token);
      dispatch(setUser({ user }));
      toast.success("User logged in successfully!", { action: { label: "X" } });
      navigate("/");
    } catch (err) {
      toast.error("OOP's! Error while login.", { action: { label: "X" } });
      setMessage("Please provide a valid email and password");
    }
  };

  return (
    <div className="max-w-sm mx-auto p-8 mt-8 text-black dark:text-white dark:border-gray-600 border">
      <Toaster richColors position="top-right" />
      <h2 className="text-2xl font-semibold pt-5  flex justify-center">
        Please Login
      </h2>
      <form onSubmit={handleLogin} className="space-y-5 max-w-sm mx-auto pt-8">
        <input
          required
          type="email"
          value={email || ""}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="w-full bg-bgPrimary focus:outline-none px-5 py-3 border bg-white text-black dark:bg-gray-900 dark:text-white dark:border-gray-600"
        />
        <input
          required
          type="password"
          value={password || ""}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
          className="w-full bg-bgPrimary focus:outline-none px-5 py-3 border bg-white text-black dark:bg-gray-900 dark:text-white dark:border-gray-600"
        />
        {message && <div className={`text-red-500 text-xs`}>{message}</div>}
        <div className="flex justify-center">
          <button
            disabled={loginLoading}
            className="mt-5 bg-slate-900 border text-white dark:text-white dark:border-gray-600 hover:bg-indigo-500 dark:bg-gray-900 font-medium py-3 rounded-md w-2/4"
          >
            Login
          </button>
        </div>
        <p className="my-5 text-center">
          Don't have an account?
          <Link to="/register" className="text-red-700 italic">
            {" "}
            Register
          </Link>{" "}
          here
        </p>

        <p className="my-5 text-center">
          Forgot password?
          <Link to="/forgot-password" className="text-red-700 italic">
            {" "}
            Click
          </Link>{" "}
          here
        </p>
      </form>
    </div>
  );
}
