import { Divider } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import nopfp from './../../assets/noPfp.png'
import {TiTick} from 'react-icons/ti'
import { IoCloseSharp } from 'react-icons/io5'
import { useSelector } from 'react-redux'
export default function FriendsRequestsList() {
    const [list,setList]=useState([])
    const [loading,setLoading]=useState(false)
    const state=useSelector((state)=>state.user.value)
    useEffect(() => {
        const handleFetchList=async()=>{
            try{
                setLoading(true)
                const res=await axios.post("http://localhost:9000/Users/requestsList",{id:state.UserData._id})
                setList(res.data)
                setLoading(false)
            }catch(err){
                console.log(err)
            }
        }
        handleFetchList()
    },[])
    const handleAcceptRequest=async(myId,id,Occupation,name,pfp)=>{
        try{
            await axios.post(`http://localhost:9000/Users/AcceptRequest/${myId}`,{_id:id,name:name,pfp:pfp,Occupation:Occupation})
            await axios.post(`http://localhost:9000/Users/AcceptRequest/${id}`,{_id:state.UserData._id,name:state.UserData.name,pfp:state.UserData.pfp,Occupation:state.UserData.Occupation})
            await axios.put("http://localhost:9000/Users/removeRequest",{UserSentToId:state.UserData._id,id:id})
            const res=await axios.post("http://localhost:9000/Users/requestsList",{id:state.UserData._id})
            setList(res.data)

        }catch(err){
            console.log(err)
        }
    }
    const handledenyRequest=async(id)=>{
        try{
            await axios.put("http://localhost:9000/Users/removeRequest",{UserSentToId:state.UserData._id,id:id})
            const res=await axios.post("http://localhost:9000/Users/requestsList",{id:state.UserData._id})
            setList(res.data)
        }catch(err){
          console.log(err)
        }
      }
  return (
    <div className={`rounded-lg ${list.length==0? "hidden":"lg:block"} shadow-sm  px-4 hidden   w-[250px]  ${state.nightDayMode===true?"bg-[#242526]":"bg-white border "}`}>
        <div className='flex justify-between pb-2 '>
        <p className={`${state.nightDayMode===true?"text-white":"text-black "}`}>Friendship requests</p>
        <p className={`${state.nightDayMode===true?"text-white":"text-black "}`}>{list.length}</p>
        </div> 
        <Divider/>
        {
            state.UserData.freindRequest.length>0?
        <div className='mt-1 overflow-y-auto max-h-[350px]'>
            {
                !loading? list.map(item=>{
                        return(
                            <div key={item[0]._id} className={`pb-1 justify-between flex`}>
                                
                  <div className='flex'>
                <img src={item[0].pfp!==""?item[0].pfp:nopfp} alt="" className='w-[32px] rounded-full cursor-pointer mt-2 ml-1 mr-3 h-[32px]'/>
                <div className=''>
                <p className={`cursor-pointer ${state.nightDayMode===true?"text-white":"text-black "} hover:text-gray-600`}>{item[0].name}</p>
                <p className={`text-sm ${state.nightDayMode===true?"text-white":"text-black "}`}>{item[0].Occupation}</p>
                </div>
                  </div>
                  <div className='flex'>
                    <TiTick onClick={()=>handleAcceptRequest(state.UserData._id,item[0]._id,item[0].Occupation,item[0].name,item[0].pfp)} color='green' className='mt-[10px] cursor-pointer h-[22px] w-[22px]'/>
                    <IoCloseSharp onClick={()=>handledenyRequest(item[0]._id)} color='red' className='mt-[12px] cursor-pointer h-[20px] w-[20px]'/>
                </div>
              </div>
                        )
                })
                :
                <p className='text-center'>Loading...</p>
            }
        </div>:
        <p className='text-center'>None...</p>
        }
    </div>
  )
}
