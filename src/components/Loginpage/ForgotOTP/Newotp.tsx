import { useState } from "react"
import { motion } from "framer-motion"
import Lottie from "lottie-react"
import otps from "../../../assets/Otp verification.json" 
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import { Link,  } from "react-router-dom"
import logo from '../../../assets/logo.png'

export default function Newotp() {

  const [otp, setotp] = useState("")

// const navigator=useNavigate()

  const handleSubmit = (e:any) => {
    e.preventDefault();
   
    console.log("Send reset link to:", otp);
  }
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-r from-blue-50 to-blue-100">

      <div className="hidden md:flex w-1/2 items-center justify-center">
        <Lottie animationData={otps} loop={true} className="w-3/4  max-w-md " />
      </div>

    
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className=" md:w-1/3 p-3  rounded-2xl "
      >
        <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
             <Link to='/' className='mb-40 max-w-290-px items-center justify-center'>
              <img src={logo} alt='Logo' className="mb-5 mx-auto border-none"/>
            </Link>
        <h2 className="text-2xl font-bold text-center mb-4">Forgot OTP</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
         <InputOTP
  maxLength={6}
  value={otp}
  onChange={(value) => setotp(value)}
  className="flex justify-center-safe gap-1" 
  required
>
  <InputOTPGroup className="flex gap-2">
    <InputOTPSlot
      index={0}
      className="  justify-center border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
    />
    <InputOTPSlot
      index={1}
      className="   justify-center border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
    />
    <InputOTPSlot
      index={2}
      className="justify-center border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
    />
  </InputOTPGroup>

  <InputOTPSeparator />

  <InputOTPGroup className="flex gap-2">
    <InputOTPSlot
      index={3}
      className=" justify-center border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
    />
    <InputOTPSlot
      index={4}
      className="  justify-center border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
    />
    <InputOTPSlot
      index={5}
      className="justify-center border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
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

      </motion.div>
    </div>
  )
}

