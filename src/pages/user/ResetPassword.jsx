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
    <div className="max-w-sm mx-auto p-8 mt-8 text-black dark:text-white dark:border-gray-600 border">
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
          placeholder="Enter new password"
          className="w-full bg-bgPrimary focus:outline-none px-5 py-3 border bg-white text-black dark:bg-gray-900 dark:text-white dark:border-gray-600"
        />

        <input
          onChange={(e) => setReEnterPassword(e.target.value)}
          required
          type="password"
          value={reEnterPassword}
          placeholder="Re-enter new password"
          className="w-full bg-bgPrimary focus:outline-none px-5 py-3 border bg-white text-black dark:bg-gray-900 dark:text-white dark:border-gray-600"
        />

        {message && <div className={`text-red-500 text-xs`}>{message}</div>}
        <div className="flex justify-center">
          <button className="mt-5 bg-slate-900 border text-white dark:text-white dark:border-gray-600 hover:bg-indigo-500 dark:bg-gray-900 font-medium py-3 rounded-md w-2/4">
            Reset Password
          </button>
        </div>
      </form>
    </div>
  );
}
