import { useState } from "react";
import { useForgotPasswordMutation } from "../../redux/features/auth/authApi";
import { Toaster, toast } from "sonner";

export default function ForgotPassword() {
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [isButtonClicked, setisButtonClicked] = useState(false);

  const [forgotPassword] = useForgotPasswordMutation();

  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
      const response = await forgotPassword(email).unwrap();
      toast.success("Reset Password link sent successfully", {
        action: { label: "X" },
      });
      setisButtonClicked(true);
    } catch (err) {
      toast.error("OOP's! Error in sending e-mail.", {
        action: { label: "X" },
      });
      console.error("Error in sending e-mail:", err.message);
      setMessage("Error in sending e-mail. Please try again.");
    }
  };

  return (
    <div className="max-w-sm border bg-white text-black dark:bg-gray-900 dark:text-white dark:border-gray-600 mx-auto p-8 mt-8">
      <Toaster richColors position="top-right" />
      {isButtonClicked ? (
        <h2 className="text-2xl font-semibold pt-5">
          If account exists for <span className="text-red-500">{email}</span>,
          you will receive a password reset link shortly
        </h2>
      ) : (
        <div>
          <h2 className="text-2xl font-semibold pt-5  flex justify-center">
            Forgot Password
          </h2>

          <form
            onSubmit={handleResetPassword}
            className="space-y-5 max-w-sm mx-auto pt-8"
          >
            <input
              onChange={(e) => setEmail(e.target.value)}
              required
              type="email"
              value={email}
              placeholder="Please enter your email"
              className="w-full bg-bgPrimary focus:outline-none px-5 py-3 border bg-white text-black dark:bg-gray-900 dark:text-white dark:border-gray-600"
            />

            {message && <div className={`text-red-500 text-xs`}>{message}</div>}
            <div className="flex justify-center">
              <button className="mt-5 bg-slate-900 border text-white dark:text-white dark:border-gray-600 hover:bg-indigo-500 dark:bg-gray-900 font-medium py-3 rounded-md w-2/4">
                Send reset link
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
