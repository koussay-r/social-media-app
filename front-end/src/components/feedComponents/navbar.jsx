import React, { useState } from 'react'
import {GoSearch} from "react-icons/go"
import {BsFillSunFill,BsBellFill} from "react-icons/bs"
import {BiMessageDetail} from "react-icons/bi"
import {AiFillQuestionCircle} from "react-icons/ai"
import AccountMenu from './menuButton'
import {BsMenuButtonWide} from 'react-icons/bs'
import {IoMdCloseCircleOutline} from 'react-icons/io'
import axios from 'axios'
import nopfp from './../../assets/noPfp.png'
export default function Navbar() {
  const [menu,setMenu]=useState(true)
  const [usersSerach,setUsersSeach]=useState([])
  const handlemenu=()=>{
    setMenu(!menu)
  }
  const handleSerachValue=async(e)=>{
    try{
      const res=await axios.post("http://localhost:9000/Users/serach",{name:e.target.value})
      if(e.target.value.length===0){
      setUsersSeach([])
      }
      else{
      setUsersSeach(res.data)
      }
    }catch(err){
      console.log(err)
    }
  }
  return (
    <div className='md:flex bg-white h-[60px] justify-between px-2 lg:px-28'>
        <div className='flex justify-between md:px-0 px-5'>
        <p className='font-bold text-center md:text-start text-[#04d0fa] pb-3 text-4xl pt-3 md:text-2xl'>
            Sociopedia
        </p>
          <div>

        <div className='hidden bg-gray-200 mt-[14px] rounded-md pr-5   ml-5 w-fit h-fit md:flex'>
        <input onChange={handleSerachValue} type={"text"} placeholder="Search..." className="h-[30px] outline-none py-[16px] bg-transparent pr-2 w-[220px] pl-5 rounded-md " />
        <GoSearch color='gray' className='mt-[9px] cursor-pointer'/>
        </div>
        {
          usersSerach.length!==0&&
          <div className='rounded ml-5 hidden md:block border-t-transparent border z-20 bg-white mt-3 w-[256px]'>
           { usersSerach.map(item=>{
            return(
              <div key={item._id} className=' pb-1 flex'>
                <img src={item.pfp!==""?item.pfp:nopfp} alt="" className='w-[32px] mt-2 ml-1 mr-3 h-[32px]'/>
                <div className=''>
                <p>{item.name}</p>
                <p className='text-sm'>{item.Occupation}</p>
                </div>
              </div>
            )
           })}
          </div>
        }
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
