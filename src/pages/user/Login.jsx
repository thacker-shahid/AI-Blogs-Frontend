import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLoginUserMutation } from "../../redux/features/auth/authApi";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/features/auth/authSlice";

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
      console.log("User logged in successfully", response);
      const { token, user } = response;
      dispatch(setUser({ user }));
      alert("User logged in successfully");
      navigate("/");
    } catch (err) {
      console.log("Error while Login: ", err);
      setMessage("Please provide a valid email and password");
    }
  };

  return (
    <div className="max-w-sm bg-white mx-auto p-8 mt-8">
      <h2 className="text-2xl font-semibold pt-5">Please Login</h2>
      <form onSubmit={handleLogin} className="space-y-5 max-w-sm mx-auto pt-8">
        <input
          required
          type="email"
          value={email || ""}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="w-full bg-bgPrimary focus:outline-none border px-5 py-3"
        />
        <input
          required
          type="password"
          value={password || ""}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
          className="w-full bg-bgPrimary focus:outline-none border px-5 py-3"
        />
        {message && <div className={`text-red-500 text-xs`}>{message}</div>}
        <button
          disabled={loginLoading}
          className="w-full mt-5 bg-slate-900 hover:bg-indigo-500 text-white font-medium py-3 rounded-md"
        >
          Login
        </button>
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
