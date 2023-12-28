import { Divider } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import FreindRequest from './FreindRequest'
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
                console.log(err.message)
            }
        }
        handleFetchList()
    },[])
  return (
    <div className={`rounded-lg ${list.length==0? "hidden":"lg:block"} shadow-sm md:mt-16  px-4 hidden   w-[250px]  ${state.nightDayMode===true?"bg-[#242526]":"bg-white border "}`}>
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
                            <FreindRequest key={item[0]._id} _id={item[0]._id} name={item[0].name} Occupation={item[0].Occupation} />
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
