import React, { useState } from 'react'
import {GoSearch} from "react-icons/go"
import {BsFillSunFill} from "react-icons/bs"
import {BiMessageDetail} from "react-icons/bi"
import {AiFillQuestionCircle} from "react-icons/ai"
import AccountMenu from './menuButton'
import Drawer from '@mui/joy/Drawer';
import DialogTitle from '@mui/joy/DialogTitle';
import ModalClose from '@mui/joy/ModalClose';
import axios from 'axios'
import UserInSearch from './userInSearch'
import { Link } from 'react-router-dom'
import {FaMoon} from "react-icons/fa"
import { useDispatch, useSelector } from 'react-redux'
import {changeNightDayMode} from '../redux/user'
import MenuIntroduction from './NotifMenu'
export default function Navbar() {
  const [usersSerach,setUsersSeach]=useState([])
  const [open, setOpen] =useState(false);
  const [loader,setLoader]=useState(false)
  const state=useSelector(state=>state.user.value)
  const dispatch=useDispatch()
  const handleSerachValue=async(e)=>{
    try{
      if(e.target.value!==""){
        setLoader(true)
      }
      else if(e.target.value===""){
        setLoader(false)
      }
      if(loader){
        document.getElementById("userInfoComponent").style.zIndex="-10"
        document.getElementById("userInfoComponent1").style.zIndex="-10"
        }   
      const res=await axios.post("http://localhost:9000/Users/serach",{name:e.target.value})
      setLoader(false)
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
 
 const hanldeNightMode=()=>{
   if(state.nightDayMode===true){
     document.body.style.backgroundColor="#f3f3f3"
    }else{
      document.body.style.backgroundColor="#0d0b0e"
    }
    dispatch(changeNightDayMode(!state.nightDayMode))
  localStorage.setItem("mode",JSON.stringify(!state.nightDayMode))
 }
  return (
    <>
    <div className={`md:flex z-[20] fixed right-0 left-0 top-0  ${state.nightDayMode===true?"bg-[#242526]":"bg-white "} h-[60px] justify-between px-2 lg:px-28`}>
        <div className='flex justify-between md:px-0 px-5'>
       <Link to={"/"} ><p  className='font-bold cursor-pointer text-center md:text-start text-[#04d0fa] pb-3 text-4xl pt-3 md:text-2xl'>
            Sociopedia
        </p></Link>
          <div>

        <div className={`hidden ${state.nightDayMode===true?"bg-[#3a3b3c]":"bg-gray-200 "}  mt-[14px] rounded-md pr-5   ml-5 w-fit h-fit md:flex`}>
        <input onChange={handleSerachValue} type={"text"} placeholder="Search..." className={` ${state.nightDayMode===true?"text-[white]":"text-black "} h-[30px] outline-none py-[16px] bg-transparent pr-2 w-[220px] pl-5 rounded-md  `}/>
        <GoSearch color='gray' className='mt-[9px] cursor-pointer'/>
        </div>
        {
          (usersSerach.length!==0&&!loader)?
          <div className={`rounded ml-5 max-h-[150px] overflow-y-auto z-[100] hidden md:block   ${state.nightDayMode===true?"bg-[#181818] border-[#04d0fa] border-t-transparent  border":"bg-white border-t-transparent border "} mt-3 w-[256px]`}>
           { usersSerach.map(item=>{
             return(
               <UserInSearch key={item._id} _id={item._id} name={item.name} Occupation={item.Occupation} friendsListIds={item.friendsListIds} freindRequest={item.freindRequest} />
               )
              })}
          </div>
          :
          (loader)&&
          <div className={`rounded ml-5 max-h-[150px] p-5 overflow-y-auto z-[100] hidden md:block   ${state.nightDayMode===true?"bg-[#181818] border-[#04d0fa] border-t-transparent  border":"bg-white border-t-transparent border "} mt-3 w-[256px]`}>     
<div role="status " className='z-[100]'>
    <svg aria-hidden="true" className="w-8 block mx-auto h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
    </svg>
    <span className="sr-only">Loading...</span>
</div>

          </div>
        }
          </div>
        <div className='block ml-6 mt-[22px] md:hidden'>
          
            <button color="danger" onClick={() => setOpen(true)} >heyy</button>
        </div>
        </div>
        <div className='md:flex hidden mb-2 gap-7'>
          {
            state.nightDayMode===false?
            <FaMoon onClick={hanldeNightMode} className='text-black/80 mt-4 cursor-pointer' size={"21"}/>:
            
            <BsFillSunFill onClick={hanldeNightMode} className='text-white/80 mt-4 cursor-pointer' size={"21"}/>
          }
            <BiMessageDetail className={` ${state.nightDayMode===false?"bg-text-black/80":"text-white "}  mt-4 cursor-pointer`} size={"21"}/>
            <MenuIntroduction/>
            <AiFillQuestionCircle className={` ${state.nightDayMode===false?"text-black/80":"text-white "}  mt-4 cursor-pointer`} size={"21"}/>
            <AccountMenu />
        </div>
    </div>
      <Drawer color='primary' slotProps={{
          content: {
            sx: {
              bgcolor: state.nightDayMode===true?"#242526":"white ",
              p: { md: 3, sm: 0 },
              boxShadow: 'none',
            },
          },
        }} open={open} onClose={() => setOpen(false)}>
        <ModalClose />
        <DialogTitle>Title</DialogTitle>
        <div>
          heyyy
        </div>
      </Drawer>
          </>
  )
}
