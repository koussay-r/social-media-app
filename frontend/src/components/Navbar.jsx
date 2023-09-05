import React, { useState } from 'react'
import {BiSearch} from "react-icons/bi"
import {BsTelephoneFill} from "react-icons/bs"
export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
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
        <button
      className={`menu block lg:hidden ${isMenuOpen ? 'opened' : ''}`}
      onClick={toggleMenu}
      aria-expanded={isMenuOpen}
      aria-label="Main Menu"
    >
      <svg width="50" height="50"  viewBox="0 0 100 100">
        <path
          className={`line  line1 ${isMenuOpen ? 'opened' : ''}`}
          d="M 20,29.000046 H 80.000231 C 80.000231,29.000046 94.498839,28.817352 94.532987,66.711331 94.543142,77.980673 90.966081,81.670246 85.259173,81.668997 79.552261,81.667751 75.000211,74.999942 75.000211,74.999942 L 25.000021,25.000058"
        />
        <path className="line line2" d="M 20,50 H 80" />
        <path
          className={`line line3 ${isMenuOpen ? 'opened' : ''}`}
          d="M 20,70.999954 H 80.000231 C 80.000231,70.999954 94.498839,71.182648 94.532987,33.288669 94.543142,22.019327 90.966081,18.329754 85.259173,18.331003 79.552261,18.332249 75.000211,25.000058 75.000211,25.000058 L 25.000021,74.999942"
        />
      </svg>
    </button>
    <div className={`transition-all duration-1000 ${isMenuOpen? "h-[300px]":"h-0"}`}>
      <div>
      <ul className='flex flex-col-reverse text-white gap-16'>
                <li className=' text-center cursor-pointer'>HOME</li>
                <li className=' text-center cursor-pointer'>ABOUT</li>
                <li className=' text-center cursor-pointer'>SERVICE</li>
                <li className=' text-center cursor-pointer'>PRICING</li>
                <li className=' text-center cursor-pointer'>CONTACT US</li>
            </ul>
      </div>
    </div>
    </div>
  )
}
