import { useState } from "react";
import { useResetPasswordMutation } from "../../redux/features/auth/authApi";
import { useNavigate, useParams } from "react-router-dom";
import { Toaster, toast } from "sonner";

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
        toast.error("OOP's! Password doesn't match.", {
          action: { label: "X" },
        });
      } else {
        await resetPassword({ token, password: password }).unwrap();
        toast.success("Password changed successfully!", {
          action: { label: "X" },
        });
        navigate("/login");
      }
    } catch (err) {
      toast.error("OOP's! Error re-setting password.", {
        action: { label: "X" },
      });
      console.error("Error re-setting password", err);
      setMessage("Error re-setting password");
    }
  };
  return (
    <div className="max-w-sm bg-white mx-auto p-8 mt-8">
      <Toaster richColors position="top-right" />
      <h2 className="text-2xl font-semibold pt-5  flex justify-center">
        Reset Password
      </h2>
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
