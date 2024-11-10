import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useRegisterUserMutation } from "../../redux/features/auth/authApi";
import { Toaster, toast } from "sonner";
import { useDispatch } from "react-redux";
import { setVerifyEmailRoute } from "../../redux/features/auth/authSlice";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [registerUser, { isLoading: registerLoading }] =
    useRegisterUserMutation();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleRegister = async (e) => {
    e.preventDefault();
    const data = { username, email, password };
    try {
      const response = await registerUser(data).unwrap();
      dispatch(setVerifyEmailRoute(true));
      toast.success(
        `User registration successful, email verification is sent at ${email}! please verify your account.`,
        { action: { label: "X" } }
      );
      const verifyEmailData = {
        email: email,
        verificationToken: response?.user?.verificationToken,
      };
      navigate("/verify-email", { state: verifyEmailData });
    } catch (err) {
      toast.error("OOP's! Error while registering user.", {
        action: { label: "X" },
      });
      setMessage(err);
      console.error("Error registering user. Please try again.");
    }
  };

  return (
    <div className="max-w-sm bg-white mx-auto p-8 mt-8">
      <Toaster richColors position="top-right" />
      <h2 className="text-2xl font-semibold pt-5  flex justify-center">
        Please Register
      </h2>
      <form
        onSubmit={handleRegister}
        className="space-y-5 max-w-sm mx-auto pt-8"
      >
        <input
          onChange={(e) => setUsername(e.target.value)}
          required
          type="text"
          value={username}
          placeholder="Enter username"
          className="w-full bg-bgPrimary focus:outline-none border px-5 py-3"
        />
        <input
          onChange={(e) => setEmail(e.target.value)}
          required
          type="email"
          value={email}
          placeholder="Enter email"
          className="w-full bg-bgPrimary focus:outline-none border px-5 py-3"
        />
        <input
          onChange={(e) => setPassword(e.target.value)}
          required
          type="password"
          value={password}
          placeholder="Enter password"
          className="w-full bg-bgPrimary focus:outline-none border px-5 py-3"
        />
        {message && <div className={`text-red-500 text-xs`}>{message}</div>}
        <button className="w-full mt-5 bg-slate-900 hover:bg-indigo-500 text-white font-medium py-3 rounded-md">
          Register
        </button>
        <p className="my-5 text-center">
          Already have an account?
          <Link to="/login" className="text-red-700 italic">
            {" "}
            Login
          </Link>{" "}
          here
        </p>
      </form>
    </div>
  );
}
