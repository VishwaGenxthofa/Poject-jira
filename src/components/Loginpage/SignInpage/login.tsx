import { useState } from "react"
import { motion } from "framer-motion"
import Lottie from "lottie-react"
import loginAnim from "../../../assets/Login.json" 
import { Eye, EyeOff } from "lucide-react" 
import { Link, useNavigate } from "react-router-dom"
import logo from '../../../assets/logo.png'// download JSON file
//import { login } from "@/components/API/Aunth/AunthServices"

export default function LoginPage() {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
const navigator=useNavigate()
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // try{
    //     const res=login(email,password)
    //     console.log({ email, password })
    //     console.log("succes",res)
    //     
    //     // window.location.href="/"

    // }catch(err){
    //     console.error('login falied',err)
    // }
console.log({ email, password })
    
    navigator('/homepage')
    
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-r from-blue-50 to-blue-100">

      <div className="hidden md:flex w-1/2 items-center justify-center">
        <Lottie animationData={loginAnim} loop={true} className="w-3/4  max-w-md " />
      </div>
   <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className=" md:w-1/3   rounded-2xl "
      >
        <div className="w-full  max-w-md bg-white p-10  rounded-2xl shadow-lg border-white">
         <div className="border-white">
            <Link to='/' className='mb-40 max-w-290-px items-center justify-center'>
              <img src={logo} alt='Logo' className="mb-5 mx-auto border-white"/>
            </Link>
             <h4 className='mb-5 text-2xl text-center font-semibold '>Sign In </h4>
          </div>
        <form onSubmit={handleSubmit} className="space-y-5">
          
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1 text-left">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="you@example.com"
            />

          </div>

      
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1 text-left">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none pr-10"
                placeholder="Password"
              />
               <button
                type="button"
                className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff size={20} />
                ) : (
                  <Eye size={20} />
                )}
              </button>
            </div>
          </div>
          <div className="text-right text-blue-600 hover:underline">
           <Link to='forgotpassword' className='text-primary-600 fw-medium text-right ' >
                  Forgot Password?
                </Link>
             
          </div>
         <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition cursor-pointer"
          >
            Login
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-5">
          Don’t have an account?{" "}
          <Link to="/register" className="text-blue-600 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
      </motion.div>
    </div>
  )
}

