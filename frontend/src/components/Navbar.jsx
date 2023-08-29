import React from 'react'
import {AiOutlineLine,AiOutlineSearch,AiOutlineHeart,AiOutlineUser} from "react-icons/ai"
import {TfiReload} from "react-icons/tfi"
export default function Navbar() {
  return (
    <div>
        <div className='bg-[#101920] flex px-24 pb-3 border border-transparent border-b-slate-600 justify-between'>
            <div>
                <p className='text-white mt-2 text-[10px]'>Free Shipping Over 100$ and Free Returns</p>
            </div>
            <div className='flex gap-6 justify-between'>
                <div className='text-white mt-2 text-[12px]'>
                    Hotline(888)4344 6000-(8888) 1338 8193
                </div>
                    <AiOutlineLine className='text-gray-600 transition-transform transform mt-2 rotate-90 '/>
                <div className=' mt-[2px]'>
                    <select className='bg-transparent text-[12px] text-white'>
                        <option>English</option>
                        <option>Spanish</option>
                        <option>Francais</option>
                    </select>
                    <select className='ml-3  bg-transparent text-[12px] text-white'>
                        <option>
                            USD $
                        </option>
                    </select>
                </div>
            </div>
        </div>
        <div className='flex bg-[#101920]  px-24 pt-3 justify-between'>
            <div className='text-white text-[34px]'>
                Digitic.
            </div>
            <div className='flex mt-3'>
                <input type='text' className='w-[700px] pl-3 rounded-r-none outline-none rounded h-[38px]' placeholder='Search Product here...'/>
                <div className='bg-[#ffbb6e] rounded mb-[0px] rounded-l-none '>
                    <AiOutlineSearch size={'22'} className='text-black mx-[14px] cursor-pointer mt-[9px]'/>
                </div>
            </div>
            <div>

            </div>
        </div>
        <div>

        </div>
    </div>
  )
}
