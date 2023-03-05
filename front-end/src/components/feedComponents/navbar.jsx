import React, { useState } from 'react'
import {GoSearch} from "react-icons/go"
import {BsFillSunFill,BsBellFill} from "react-icons/bs"
import {BiMessageDetail} from "react-icons/bi"
import {AiFillQuestionCircle} from "react-icons/ai"
import AccountMenu from './menuButton'
import {BsMenuButtonWide} from 'react-icons/bs'
import {IoMdCloseCircleOutline} from 'react-icons/io'
export default function Navbar() {
  const [menu,setMenu]=useState(true)
  const handlemenu=()=>{
    setMenu(!menu)
  }
  return (
    <div className='md:flex bg-white justify-between px-2 lg:px-28'>
        <div className='flex justify-between md:px-0 px-5'>
        <p className='font-bold text-center md:text-start text-[#04d0fa] pb-3 text-4xl pt-3 md:text-2xl'>
            Sociopedia
        </p>
        <div className='hidden bg-gray-200 mt-[14px] rounded-md pr-5   ml-5 w-fit h-fit md:flex'>
        <input type={"text"} placeholder="Search..." className="h-[30px] outline-none py-[16px] bg-transparent pr-2 w-[220px] pl-5 rounded-md " />
        <GoSearch color='gray' className='mt-[9px] cursor-pointer'/>
        </div>
        <div className='block ml-6 mt-[22px] md:hidden'>
          {
            menu?
            <BsMenuButtonWide color='#04d0fa' onClick={handlemenu} className='cursor-pointer' size={25}/>
            :
            <IoMdCloseCircleOutline color='#04d0fa' onClick={handlemenu} className='cursor-pointer' size={25}/>
          }
        </div>
        </div>
        <div className='md:flex hidden mb-2 gap-7'>
            <BsFillSunFill className='text-black/80 mt-4 cursor-pointer' size={"21"}/>
            <BiMessageDetail className='text-black/80 mt-4 cursor-pointer' size={"21"}/>
            <BsBellFill className='text-black/80 mt-4 cursor-pointer' size={"21"}/>
            <AiFillQuestionCircle className='text-black/80 mt-4 cursor-pointer' size={"21"}/>
            <AccountMenu/>
        </div>
        
    </div>
  )
}
