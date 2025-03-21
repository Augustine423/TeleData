// import { useState } from 'react'
// import { IoMdEye, IoMdEyeOff } from 'react-icons/io'
// import logo from "../../assets/Logo.png.png"

// const Header = () => {
//     const [showPassword, setShowPassword] = useState(false);
//     const handleShowPassword = () => {
//         setShowPassword(!showPassword);
//     }
//   return (
//     <>

//     <main className="w-full h-screen flex justify-center items-center flex-col font-pretendard">
//             <form className="xl:w-1/4 lg:w-1/2 md:w-1/2 flex flex-col justify-center items-center bg-primary p-16 rounded-xl">
//                 <img src={logo} alt="logo"/>
//                 <div className="w-full bg-transparent flex flex-col justify-center items-center text-white gap-3 mt-10">
//                     <h1 className="text-6xl font-bold">Welcome</h1>
//                     <span>Sign in to your account</span>
//                 </div>
//                 <div className="w-full bg-transparent flex flex-col text-white gap-1 mt-10">
//                     <label>User name or E-mail</label>
//                     <input type="text" placeholder="User name or E-mail" className="p-2 rounded-md border-0.5 bg-primary text-sm border-"/>
//                 </div>
//                 <div className="w-full bg-transparent flex flex-col text-white gap-1 mt-5 relative">
//                     <label>Password</label>
//                     <input type={!showPassword ? `password` : `text`} placeholder="Password" className="p-2 rounded-md border-0.5 bg-transparent text-sm"/>
//                     { !showPassword ?
//                         <IoMdEye className="absolute right-2 top-[37px] cursor-pointer" size={"20px"} onClick={handleShowPassword}></IoMdEye>
//                         : <IoMdEyeOff className="absolute right-2 top-[37px] cursor-pointer" size={"20px"} onClick={handleShowPassword}></IoMdEyeOff>
//                     }
//                 </div>
//                 <div className="w-full bg-transparent flex justify-between text-white gap-1 mt-5">
//                     <div className="flex items-center">
//                         <input type="checkbox" className="mr-2"/>
//                         <label className="text-center">Remember me</label>
//                     </div>
//                     <div href="#" className="text-xs font-bold cursor-pointer">Forgot password?</div>
//                 </div>
//                 <div className="w-full bg-transparent flex justify-between text-white gap-1 mt-5">
//                     <button className="w-full flex justify-center items-center p-3 rounded-md border-0.5 bg-white text-customcolor text-xs">Login</button>
//                 </div>
//                 <hr className="bg-white w-full mt-10"/>
//                 <div className="w-full bg-transparent flex justify-center text-white gap-3 mt-5">
//                     <span className="text-sm">New member?</span>
//                     <span className="text-sm font-bold">Register</span>
//                 </div>
//             </form>
//         </main>
 
    
//     </>
//   )
// }

// export default Header

import React from 'react'

const Header = () => {
  return (
    <div>Header</div>
  )
}

export default Header