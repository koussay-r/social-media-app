import React, { useState } from 'react'
import nopfp from './../../assets/noPfp.png'
import {IoPersonAddSharp,IoPersonRemoveSharp} from 'react-icons/io5'
import { AuthenticatedContext } from '../../App'
import axios from 'axios'
import { Link } from 'react-router-dom'

export default function UserInSearch(item) {
  const [nightDayMode,setNightDayMode,auth,setAuth,UserData,setUserData,posts,setPosts,profileUser,setProfileUser]=React.useContext(AuthenticatedContext)
  const [changeIconSendRequest,setChangeIconSendRequest]=useState(item.freindRequest.includes(UserData._id))
  const hanldeSendRequest=async(idUserSentto)=>{
    setChangeIconSendRequest(!changeIconSendRequest)
    setUserData(UserData)
    try{
      await axios.put("http://localhost:9000/Users/sendRequest",{_id:UserData._id,UserSentToId:idUserSentto})
    }catch(err){
      console.log(err)
    }
  }
  const hanldeRemoveRequest=async(idUserSentto)=>{
    setChangeIconSendRequest(!changeIconSendRequest)
    setUserData(UserData)
    try{
      await axios.put("http://localhost:9000/Users/removeRequest",{id:UserData._id,UserSentToId:idUserSentto})
    }catch(err){
      console.log(err)
    }
  }
  const handleGoToProfile=async()=>{
    setProfileUser(UserData.name)
    try{
      const res=await axios.post(`http://localhost:9000/posts/`,{userId:item._id})
      console.log(res.data)
      const res2=await axios.post("http://localhost:9000/Users/findUserById",{_id:item._id})
      setUserData(res2.data[0])
      setPosts(res.data)
  }
  catch(err){
      console.log(err)
  }
  }
  return (
    <div key={item._id} className={`${item._id===UserData._id? "hidden":"block"} pb-1 justify-between flex`}>
                  <div className='flex'>
                <img src={item.pfp!==""?item.pfp:nopfp} alt="" className='w-[32px] cursor-pointer mt-2 ml-1 mr-3 h-[32px]'/>
                <div className=''>
                <Link to={`/profile/${item.name}`}><p onClick={handleGoToProfile} className={`cursor-pointer ${nightDayMode===true?"text-white":"text-black "} hover:text-gray-600`}>{item.name}</p></Link>
                <p className={`text-sm ${nightDayMode===true?"text-white":"text-black "}`}>{item.Occupation}</p>
                </div>
                  </div>
                  {
                    !item.friendsListIds.includes(UserData._id)&&
                    (changeIconSendRequest?
                <IoPersonRemoveSharp onClick={()=>hanldeRemoveRequest(item._id)}  size={'20'} className={`mt-[10px] cursor-pointer  text-[#04d0fa] mr-3`}/>
                    :
                <IoPersonAddSharp onClick={()=>hanldeSendRequest(item._id)} size={'20'} className={`mt-[10px] cursor-pointer  text-[#04d0fa] mr-3`}/>
            ) }
            </div>
  )
}
