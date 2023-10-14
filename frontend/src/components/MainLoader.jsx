import React, { useState } from 'react'
import mainLoader from "./../assets/MainLoader.gif"
export default function MainLoader() {
    const [getBgColor,setGetBgColor]=useState(localStorage.getItem("mode")===null?null:JSON.parse(localStorage.getItem("mode")))
  return (
    <div className={`w-full ${getBgColor===null?"":(getBgColor===false?"bg-[#f3f3f3]":"bg-[#0d0b0e]")}  h-[100vh]`}>
        <div className='flex gap-3 pt-[80px] justify-center'>
        <p className='font-bold  text-center  text-[#04d0fa] text-[50px] '>
            Sociopedia
        </p>
        <p className={`relative text-[17px] ${getBgColor===null?"":(getBgColor===false?"text-[#323434]":"text-white")}   top-[37px]`}>is Loading...</p>
        </div>
        <img src={mainLoader} className='w-[500px] h-[500px] mt-[1%] mx-auto' alt='Loading'/>
    </div>
  )
}
