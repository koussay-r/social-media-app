import React from 'react'
import {BiSearch} from "react-icons/bi"
import {BsTelephoneFill} from "react-icons/bs"
export default function Navbar() {
  return (
    <div className='flex bg-[#020230] justify-between p-4'>
        <p className='text-[26px] font-bold text-white'>
            HOSTIT
        </p>
        <div className=' hidden lg:flex pt-2 gap-10'>
            <ul className='flex text-white gap-16'>
                <li className='cursor-pointer'>HOME</li>
                <li className='cursor-pointer'>ABOUT</li>
                <li className='cursor-pointer'>SERVICE</li>
                <li className='cursor-pointer'>PRICING</li>
                <li className='cursor-pointer'>CONTACT US</li>
            </ul>
            <BiSearch color='white' size={"22"} className='mt-1 cursor-pointer'/>
            <div className='flex text-white gap-2'>

            <BsTelephoneFill className='text-white mt-1'/>
           <p className='text-white'>Call : +01 123455678990 </p> 
            </div>
        </div>
        
    </div>
  )
}
