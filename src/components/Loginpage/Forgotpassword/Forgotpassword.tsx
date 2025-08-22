import { useState } from "react";
import { Link } from "react-router-dom";
export default function ForgotPassword() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e:any) => {
    e.preventDefault();
   
    console.log("Send reset link to:", email);
  };

  return (
    <div className="flex items-center justify-center h-screen ">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-4">Forgot Password</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Send
          </button>
        </form>
        <div className="text-center p-2 text-blue-600 font-semibold">
                                <Link to="/" className=" fw-bold mt-24">
                                    Back to Sign In
                                </Link>
                            </div>
      </div>
    </div>
  );
}
