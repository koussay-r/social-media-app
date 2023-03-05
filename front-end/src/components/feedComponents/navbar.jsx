import React from 'react'
import {GoSearch} from "react-icons/go"
import {BsFillSunFill,BsBellFill} from "react-icons/bs"
import {BiMessageDetail} from "react-icons/bi"
import {AiFillQuestionCircle} from "react-icons/ai"
import AccountMenu from './menuButton'
export default function Navbar() {
  
  return (
    <div className='flex bg-white justify-between px-2 lg:px-28'>
        <div className='flex '>
        <p className='font-bold text-[#04d0fa] pb-3  pt-3 text-2xl'>
            Sociopedia
        </p>
        <div className=' bg-gray-200 mt-[14px] rounded-md pr-5   ml-5 w-fit h-fit flex'>
        <input type={"text"} placeholder="Search..." className="h-[30px] outline-none py-[16px] bg-transparent pr-2 w-[220px] pl-5 rounded-md " />
        <GoSearch color='gray' className='mt-[9px] cursor-pointer'/>
        </div>
        </div>
        <div className='flex mb-2 gap-7'>
            <BsFillSunFill className='text-black/80 mt-4 cursor-pointer' size={"21"}/>
            <BiMessageDetail className='text-black/80 mt-4 cursor-pointer' size={"21"}/>
            <BsBellFill className='text-black/80 mt-4 cursor-pointer' size={"21"}/>
            <AiFillQuestionCircle className='text-black/80 mt-4 cursor-pointer' size={"21"}/>
            <AccountMenu/>
        </div>
    </div>
  )
}
