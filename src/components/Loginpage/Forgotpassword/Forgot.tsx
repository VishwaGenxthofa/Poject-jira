import { useState } from "react"
import { motion } from "framer-motion"
import Lottie from "lottie-react"
import forgot from "../../../assets/forgot password red.json" 

import { Link,  } from "react-router-dom"
import logo from '../../../assets/logo.png'

export default function Forgot() {

  const [email, setEmail] = useState("")

// const navigator=useNavigate()

  const handleSubmit = (e:any) => {
    e.preventDefault();
   
    console.log("Send reset link to:", email);
  }
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-r from-blue-50 to-blue-100">

      <div className="hidden md:flex w-1/2 items-center justify-center">
        <Lottie animationData={forgot} loop={true} className="w-3/4  max-w-md " />
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

      </motion.div>
    </div>
  )
}

