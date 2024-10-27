import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useVerifyEmailMutation } from "../../redux/features/auth/authApi";

export default function VerifyEmail() {
  const location = useLocation();
  const verifyEmailData = location.state;
  const navigate = useNavigate();

  const [message, setMessage] = useState("");
  const [userVerificatinToken, setUserVerificationToken] = useState("");

  const [verifyEmail] = useVerifyEmailMutation(userVerificatinToken);

  const handleVerifyEmail = async (e) => {
    e.preventDefault();
    try {
      if (userVerificatinToken != verifyEmailData.verificationToken) {
        alert("Please enter correct verification code");
        setMessage("Please enter correct verification code");
      } else {
        const response = await verifyEmail(userVerificatinToken).unwrap();
        alert(`Verified successfully.`);
        navigate("/login");
      }
    } catch (err) {
      setMessage(err);
      console.error("Error: ", err);
    }
  };

  return (
    <div className="max-w-sm bg-white mx-auto p-8 mt-8">
      <h2 className="text-2xl font-semibold pt-5  flex justify-center">
        Please check your email
      </h2>
      <p>We have sent 6 digit verificaton code to {verifyEmailData.email}</p>
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
  );
}
