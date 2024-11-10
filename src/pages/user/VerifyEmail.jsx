import { useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useVerifyEmailMutation } from "../../redux/features/auth/authApi";
import { Toaster, toast } from "sonner";
import { useDispatch } from "react-redux";
import { setVerifyEmailRoute } from "../../redux/features/auth/authSlice";
import { useSelector } from "react-redux";

export default function VerifyEmail() {
  const { verifyEmailRouteStatus } = useSelector((state) => {
    return state.auth;
  });

  const location = useLocation();
  const verifyEmailData = location.state;
  const navigate = useNavigate();

  const [message, setMessage] = useState("");
  const [userVerificatinToken, setUserVerificationToken] = useState("");

  const [verifyEmail] = useVerifyEmailMutation(userVerificatinToken);

  const dispatch = useDispatch();

  const handleVerifyEmail = async (e) => {
    e.preventDefault();
    try {
      if (userVerificatinToken != verifyEmailData.verificationToken) {
        toast.error("OOP's! Please enter correct verification code.", {
          action: { label: "X" },
        });
        setMessage("Please enter correct verification code");
      } else {
        const response = await verifyEmail(userVerificatinToken).unwrap();
        dispatch(setVerifyEmailRoute(false));
        toast.success("Email verified successfully!", {
          action: { label: "X" },
        });
        navigate("/login");
      }
    } catch (err) {
      toast.error("Oops! Failed to verify email.", { action: { label: "X" } });
      console.error("Error: ", err);
      setMessage("Failed to verify email. Please try again");
    }
  };

  return (
    <>
      {verifyEmailRouteStatus && (
        <div className="max-w-sm bg-white mx-auto p-8 mt-8">
          <Toaster richColors position="top-right" />
          <h2 className="text-2xl font-semibold pt-5  flex justify-center">
            Please check your email
          </h2>
          <p className=" pt-5flex justify-center">
            We have sent 6 digit verificaton code to {verifyEmailData?.email}
          </p>
          <form
            onSubmit={handleVerifyEmail}
            className="space-y-5 max-w-sm mx-auto pt-8"
          >
            <input
              onChange={(e) => setUserVerificationToken(e.target.value)}
              required
              type="number"
              value={userVerificatinToken}
              placeholder="Enter 6 digit code"
              className="w-full bg-bgPrimary focus:outline-none border px-5 py-3"
            />

            {message && <div className={`text-red-500 text-xs`}>{message}</div>}
            <button className="w-full mt-5 bg-slate-900 hover:bg-indigo-500 text-white font-medium py-3 rounded-md">
              Verify Email
            </button>
          </form>
        </div>
      )}

      {verifyEmailRouteStatus || (
        <Navigate to="/login" state={{ from: location }} replace />
      )}
    </>
  );
}
