import { useState } from "react";
import { Helmet } from "react-helmet";
import { useLocation } from "react-router";
import { toast } from "react-toastify";

const ForgotPass = () => {
  const location = useLocation();
  const emailFromLogin = location.state?.email || "";
  const [email, setEmail] = useState(emailFromLogin);

  const handleReset = async (e) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter your email address.");
      return;
    }
    try {
      toast.success("Password reset email sent!");
      // Redirect to Gmail
      window.location.href = "https://mail.google.com";
    } catch (error) {
      toast.error("Failed to send reset email.");
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-base-200 py-12 px-4">
      <Helmet>
        <title>Reset | COOKIFY</title>
      </Helmet>
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold mb-8 text-center text-blue-700">
          Forgot Password
        </h2>
        <form onSubmit={handleReset} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              className="input input-bordered w-full"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-full">
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPass;
