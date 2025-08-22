

import { BrowserRouter, Route, Routes } from 'react-router-dom'


import Forgototp from './components/Loginpage/ForgotOTP/Forgototp'
import LoginPage from './components/Loginpage/SignInpage/login'
import Forgot from './components/Loginpage/Forgotpassword/Forgot'
import Newotp from './components/Loginpage/ForgotOTP/Newotp'
import Layout from './components/Masterlayout/layout'




function App() {
  

  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage></LoginPage>}></Route>
        <Route path='/forgotpassword' element={<Forgot></Forgot>}> </Route>
        <Route path='/forgototp' element={<Newotp></Newotp>}></Route>
        <Route path='/homepage' element={<Layout></Layout>}></Route>
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App