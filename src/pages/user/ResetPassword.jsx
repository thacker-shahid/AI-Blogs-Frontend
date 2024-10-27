import { useState } from "react";
import { useResetPasswordMutation } from "../../redux/features/auth/authApi";
import { useNavigate, useParams } from "react-router-dom";

export default function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [reEnterPassword, setReEnterPassword] = useState("");
  const [message, setMessage] = useState("");

  const [resetPassword] = useResetPasswordMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (password != reEnterPassword) {
        setMessage("Password doesn't match!");
        alert("Password doesn't match!");
      } else {
        await resetPassword({ token, password: password }).unwrap();
        alert("Password changed successfully!");
        navigate("/login");
      }
    } catch (err) {
      console.error("Error resetting password", err);
      setMessage("Error resetting password");
    }
  };
  return (
    <div className="max-w-sm bg-white mx-auto p-8 mt-8">
      <h2 className="text-2xl font-semibold pt-5">Reset Password</h2>
      <form onSubmit={handleSubmit} className="space-y-5 max-w-sm mx-auto pt-8">
        <input
          onChange={(e) => setPassword(e.target.value)}
          required
          type="password"
          value={password}
          placeholder="Please enter your email"
          className="w-full bg-bgPrimary focus:outline-none border px-5 py-3"
        />

        <input
          onChange={(e) => setReEnterPassword(e.target.value)}
          required
          type="password"
          value={reEnterPassword}
          placeholder="Please enter your email"
          className="w-full bg-bgPrimary focus:outline-none border px-5 py-3"
        />

        {message && <div className={`text-red-500 text-xs`}>{message}</div>}
        <button className="w-full mt-5 bg-slate-900 hover:bg-indigo-500 text-white font-medium py-3 rounded-md">
          Reset Password
        </button>
      </form>
    </div>
  );
}
