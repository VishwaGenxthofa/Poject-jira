import { useState } from "react";
import { Link } from "react-router-dom";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import type { number } from "framer-motion";
export default function Forgototp() {
  const [otp, setotp] = useState("");

  const handleSubmit = (e:any) => {
    e.preventDefault();
   
    console.log("Send reset link to:", otp);
  };

  return (
    <div className="flex items-center justify-center h-screen ">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-4">Forgot OTP</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* <input
            type="email"
            placeholder="Enter your otp"
            value={otp}
            onChange={(e) => setotp(e.target.value)}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          /> */}
         <InputOTP
  maxLength={6}
  value={otp}
  onChange={(value) => setotp(value)}
  inputMode="numeric"
  pattern="[0-9]*"
  type="nummber"
  className="flex justify-center gap-2" // ✅ center alignment
>
  <InputOTPGroup className="flex gap-3">
    <InputOTPSlot
      index={0}
     
      className="w-12 h-12 flex items-center justify-center border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
    />
    <InputOTPSlot
      index={1}
      
      className="w-12 h-12 flex items-center justify-center border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
    />
    <InputOTPSlot
      index={2}
      
      className="w-12 h-12 flex items-center justify-center border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
    />
  </InputOTPGroup>

  <InputOTPSeparator />

  <InputOTPGroup className="flex gap-3">
    <InputOTPSlot
      index={3}
      
    
      className="w-12 h-12 flex items-center justify-center border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
    />
    <InputOTPSlot
      index={4}
      
       
      className="w-12 h-12 flex items-center justify-center border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
    />
    <InputOTPSlot
      index={5}
      
      
      className="w-12 h-12 flex items-center justify-center border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
    />
  </InputOTPGroup>
</InputOTP>

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
