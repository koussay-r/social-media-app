import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { AuthenticatedContext } from '../../App';

export default function ResetPassword() {
  const [nightDayMode,setNightDayMode,auth,setAuth,UserData,setUserData,posts,setPosts,accountExistCookies,setAccountExistCookies,profileUser,setProfileUser,emailRecoverPassword,setEmailRcoverPassword]=React.useContext(AuthenticatedContext);
  const [recovery_code,setRecoveryCode]=useState(0)
  useEffect(()=>{
    const handleGetRecoveryCode=async()=>{
      try {
        const res=await axios.get("http://localhost:9000/Serachroute/recoveryCode")
        console.log(res.data)
      } catch (error) {
        console.log(error)
      }
    }
    handleGetRecoveryCode()
  })
  return (
    <div className='mx-auto bg-[#e9ebee] h-[100vh] block'>
    <header className='text-center font-bold text-[#04d0fa] bg-white w-full pb-3 shadow-sm pt-3 text-4xl'>
        Sociopedia
    </header>
    </div>
  )
}
