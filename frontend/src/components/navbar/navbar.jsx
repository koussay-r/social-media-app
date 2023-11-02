import React, { useEffect, useState } from 'react'
import {GoSearch} from "react-icons/go"
import {BsFillSunFill,BsBellFill} from "react-icons/bs"
import {BiMessageDetail} from "react-icons/bi"
import {AiFillQuestionCircle} from "react-icons/ai"
import AccountMenu from './menuButton'
import {BsMenuButtonWide} from 'react-icons/bs'
import {IoMdCloseCircleOutline} from 'react-icons/io'
import axios from 'axios'
import UserInSearch from './userInSearch'
import { Link } from 'react-router-dom'
import {FaMoon} from "react-icons/fa"
import { useDispatch, useSelector } from 'react-redux'
import { data } from '../redux/user'
export default function Navbar() {
  const [menu,setMenu]=useState(true)
  const [usersSerach,setUsersSeach]=useState([])
  const handlemenu=()=>{
    setMenu(!menu)
  }
  const state=useSelector((state)=>state.user.value)
  const dispatch=useDispatch()
  const handleSerachValue=async(e)=>{
    try{
      const res=await axios.post("http://localhost:9000/Users/serach",{name:e.target.value})
      if(e.target.value.length===0){
      setUsersSeach([])
      document.getElementById("userInfoComponent").style.zIndex="0"
      document.getElementById("userInfoComponent1").style.zIndex="0"
      }
      else{
      setUsersSeach(res.data)
      document.getElementById("userInfoComponent").style.zIndex="-10"
      document.getElementById("userInfoComponent1").style.zIndex="-10"
      }
    }catch(err){
      console.log(err)
    }
  }
 const handleReturnToFeed=async()=>{
  try{
    const res=await axios.post(`http://localhost:9000/posts/`,{userId:"0"})
    const ress=await axios.post("http://localhost:9000/createUser/CurrentUser",{_id:JSON.parse(localStorage.getItem("userID"))})
    dispatch(data({
      UserData:ress.data[0],
      posts:res.data
    }))
  }catch(err){
    console.log(err)
  }
 }
 const hanldeNightMode=()=>{
   if(state.nightDayMode===true){
     document.body.style.backgroundColor="#f3f3f3"
    }else{
      document.body.style.backgroundColor="#0d0b0e"
    }
    dispatch(data({nightDayMode:!state.nightDayMode}))
  localStorage.setItem("mode",JSON.stringify(!state.nightDayMode))
 }
  return (
    <div className={`md:flex ${state.nightDayMode===true?"bg-[#242526]":"bg-white "} h-[60px] justify-between px-2 lg:px-28`}>
        <div className='flex justify-between md:px-0 px-5'>
       <Link to={"/home"} ><p onClick={handleReturnToFeed} className='font-bold cursor-pointer text-center md:text-start text-[#04d0fa] pb-3 text-4xl pt-3 md:text-2xl'>
            Sociopedia
        </p></Link>
          <div>

        <div className={`hidden ${state.nightDayMode===true?"bg-[#3a3b3c]":"bg-gray-200 "}  mt-[14px] rounded-md pr-5   ml-5 w-fit h-fit md:flex`}>
        <input onChange={handleSerachValue} type={"text"} placeholder="Search..." className={` ${state.nightDayMode===true?"text-[white]":"text-black "} h-[30px] outline-none py-[16px] bg-transparent pr-2 w-[220px] pl-5 rounded-md  `}/>
        <GoSearch color='gray' className='mt-[9px] cursor-pointer'/>
        </div>
        {
          usersSerach.length!==0&&
          <div className={`rounded ml-5 max-h-[150px] overflow-y-auto z-[100] hidden md:block   ${state.nightDayMode===true?"bg-[#181818] border-[#04d0fa] border-t-transparent  border":"bg-white border-t-transparent border "} mt-3 w-[256px]`}>
           { usersSerach.map(item=>{
            return(
              <UserInSearch key={item._id} _id={item._id} pfp={item.pfp} name={item.name} Occupation={item.Occupation} friendsListIds={item.friendsListIds} freindRequest={item.freindRequest} />
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
          {
            state.nightDayMode===false?
            <FaMoon onClick={hanldeNightMode} className='text-black/80 mt-4 cursor-pointer' size={"21"}/>:

            <BsFillSunFill onClick={hanldeNightMode} className='text-white/80 mt-4 cursor-pointer' size={"21"}/>
          }
            <BiMessageDetail className={` ${state.nightDayMode===false?"bg-text-black/80":"text-white "}  mt-4 cursor-pointer`} size={"21"}/>
            <BsBellFill className={` ${state.nightDayMode===false?"text-black/80":"text-white "}  mt-4 cursor-pointer`} size={"21"}/>
            <AiFillQuestionCircle className={` ${state.nightDayMode===false?"text-black/80":"text-white "}  mt-4 cursor-pointer`} size={"21"}/>
            <AccountMenu/>
        </div>
        
    </div>
  )
}
