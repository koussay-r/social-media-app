import React, {  useState } from 'react'
import nopfp from './../../assets/noPfp.png'
import {IoPersonAddSharp,IoPersonRemoveSharp} from 'react-icons/io5'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {changeUserData,changeProfileUser} from "./../redux/user"
import {changePostsToNone} from "./../redux/postsSlice"
export default function UserInSearch(item) {
  const state=useSelector((state)=>state.user.value)
  const [changeIconSendRequest,setChangeIconSendRequest]=useState(item.freindRequest.includes(state.UserData._id))
  const dispatch=useDispatch()
  const hanldeSendRequest=async(idUserSentto)=>{
    setChangeIconSendRequest(!changeIconSendRequest)
    dispatch(changeUserData(state.UserData))

    try{
      await axios.put("http://localhost:9000/Users/sendRequest",{_id:state.UserData._id,UserSentToId:idUserSentto})
    }catch(err){
      console.log(err)
    }
  }
  const hanldeRemoveRequest=async(idUserSentto)=>{
    setChangeIconSendRequest(!changeIconSendRequest)
    dispatch(changeUserData(state.UserData))
    try{
      await axios.put("http://localhost:9000/Users/removeRequest",{id:state.UserData._id,UserSentToId:idUserSentto})
    }catch(err){
      console.log(err)
    }
  }
  const handleEmptyPosts=()=>{
    dispatch(changePostsToNone())
}
  return (
    <div key={item._id} className={`${item._id===state.UserData._id? "hidden":"block"} pb-1 justify-between flex`}>
                  <div className='flex'>
                  <Link to={`/profile/${item._id}`}><img onClick={handleEmptyPosts} src={item.pfp!==""?item.pfp:nopfp} alt="" className='w-[32px] cursor-pointer rounded-full mt-2 ml-1 mr-3 h-[32px]'/></Link> 
                <div className=''>
                <Link to={`/profile/${item._id}`}><p onClick={handleEmptyPosts} className={`cursor-pointer ${state.nightDayMode===true?"text-white":"text-black "} hover:text-gray-600`}>{item.name}</p></Link>
                <p className={`text-sm ${state.nightDayMode===true?"text-white":"text-black "}`}>{item.Occupation}</p>
                </div>
                  </div>
                  {
                    !item.friendsListIds.includes(state.UserData._id)&&
                    (changeIconSendRequest?
                <IoPersonRemoveSharp onClick={()=>hanldeRemoveRequest(item._id)}  size={'20'} className={`mt-[10px] cursor-pointer  text-[#04d0fa] mr-3`}/>
                    :
                <IoPersonAddSharp onClick={()=>hanldeSendRequest(item._id)} size={'20'} className={`mt-[10px] cursor-pointer  text-[#04d0fa] mr-3`}/>
            ) }
            </div>
  )
}
