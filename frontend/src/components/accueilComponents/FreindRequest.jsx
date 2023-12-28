import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import nopfp from './../../assets/noPfp.png'
import {TiTick} from 'react-icons/ti'
import { IoCloseSharp } from 'react-icons/io5'
export default function FreindRequest(props) {
    const state=useSelector((state)=>state.user.value)
    const [UserPfp,setUserPfp]=useState("")
    const handledenyRequest=async(id)=>{
        try{
            await axios.put("http://localhost:9000/Users/removeRequest",{UserSentToId:state.UserData._id,id:id})
        }catch(err){
          console.log(err)
        }
      }
      const handleAcceptRequest=async(myId,id,Occupation,name)=>{
        try{
            await axios.post(`http://localhost:9000/Users/AcceptRequest/${myId}`,{_id:id,name:name,Occupation:Occupation})
            await axios.post(`http://localhost:9000/Users/AcceptRequest/${id}`,{_id:state.UserData._id,name:state.UserData.name,Occupation:state.UserData.Occupation})
            await axios.put("http://localhost:9000/Users/removeRequest",{UserSentToId:state.UserData._id,id:id})
        }catch(err){
            console.log(err)
        }
    }
    useEffect(() => {
        const handleGetUserPfp=async()=>{
            try {
              const response=await axios.post("http://localhost:9000/posts/getPostUserpfp",{PostUserId:props._id},{
                      responseType: 'blob',
                    })
                    const reader = new FileReader();
                    reader.onload = () => {
                      setUserPfp(reader.result);
                    }
                    reader.readAsDataURL(response.data);
            } catch (error) {
              console.log(error.message)
            }
          }
          handleGetUserPfp()
    }, [])
  return (
    <div  className={`pb-1 justify-between flex`}>
                                
                  <div className='flex'>
                <img src={UserPfp!==""?UserPfp:nopfp} alt="" className='w-[32px] rounded-full cursor-pointer mt-2 ml-1 mr-3 h-[32px]'/>
                <div className=''>
                <p className={`cursor-pointer ${state.nightDayMode===true?"text-white":"text-black "} hover:text-gray-600`}>{props.name}</p>
                <p className={`text-sm ${state.nightDayMode===true?"text-white":"text-black "}`}>{props.Occupation}</p>
                </div>
                  </div>
                  <div className='flex'>
                    <TiTick onClick={()=>handleAcceptRequest(state.UserData._id,props._id,props.Occupation,props.name)} color='green' className='mt-[10px] cursor-pointer h-[22px] w-[22px]'/>
                    <IoCloseSharp onClick={()=>handledenyRequest(props._id)} color='red' className='mt-[12px] cursor-pointer h-[20px] w-[20px]'/>
                </div>
              </div>
  )
}
