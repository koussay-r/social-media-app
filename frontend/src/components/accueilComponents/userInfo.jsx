import { Divider } from '@mui/material'
import React, { useEffect, useState } from 'react'
import noPfp from './../../assets/noPfp.png'
import {HiOutlineLocationMarker} from 'react-icons/hi'
import {MdWorkOutline} from 'react-icons/md'
import { Link, useLocation  } from 'react-router-dom'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { data } from '../redux/user'

export default function UserInfo() {
    const location=useLocation ()
 const [loader,SetLoader]=useState(false) 
 const state=useSelector((state)=>state.user.value)
 const dispatch=useDispatch()
 const HandleProfile=async()=>{
     try{
         const res=await axios.post(`http://localhost:9000/posts/`,{userId:state.UserData._id})
         dispatch(data({
            posts:res.data
         }))
        }
        catch(err){
            console.log(err)
        }
    }
    const handleChangePfp=async(event)=>{
        const base64=await ConvertToBase64(event.target.files[0])
        const setData = (userData) => ({
            type: 'SET_USER_DATA',
            payload: userData,
          });
        dispatch(setData(setData({ pfp: base64 })))
        try {
        SetLoader(true)
        const res=await axios.post(`http://localhost:9000/createUser/updatePfp/${state.UserData._id}`,{pfp:base64})
        SetLoader(false)
        if(res.message===true){
            toast.success('Your profile picture have been Successfully updated !')
        }
        else{
            toast.error('Something went wrong while updating your profile picture')
        }
        
    } catch (error) {
        
    }
}
useEffect(()=>{
    dispatch(data({
        profileUser: state.UserData.name
    }))
},[])
return (
    <>
    {
        state.UserData.length!==0?
    <div id='' className={`rounded-lg  shadow-sm  ${location.pathname==='/home'?"hidden md:block":"block md:mx-0 mx-auto"} w-[350px]  ${state.nightDayMode===true?"bg-[#242526]":"bg-white border "}`}>
            <div className='p-3 '>
            <div className='flex mb-3'>
                {
                    (location.pathname===`/profile`&&state.UserData._id===JSON.parse(localStorage.getItem("userID")))?
                    <div>
                        <label
              htmlFor="file-upload"
            >
                        <img  src={state.UserData.pfp===""?noPfp:state.UserData.pfp} alt="no pfp" className='rounded-full cursor-pointer w-11 h-11'/>
            </label>
            <input
              id="file-upload"
              onChange={handleChangePfp}
              accept="image/*"
              className=" hidden "
              type="file"
            />
                        </div>
                    :
                    <img src={state.UserData.pfp===""?noPfp:state.UserData.pfp} alt="no pfp" className='rounded-full object-cover w-11 h-11'/>
                }
                <div className=' ml-3'>
                    <Link to={`/profile`}><p onClick={HandleProfile} className={`${state.nightDayMode===true?"text-[white]":"text-black/80 "} hover:text-gray-600 cursor-pointer font-[600]`}>{state.UserData.name} {state.UserData.LastName}</p></Link> 
                    <p className={` ${state.nightDayMode===true?"text-[white]":"text-gray-600 "} font-WorkSans font-[600] text-[11px] ml-2`}> {state.UserData.friendsList.length} friends</p>
                </div>
            </div>
        <Divider  />
            <div className='mt-2 mb-3'>
                <div className='flex '>
                    <HiOutlineLocationMarker className='mt-1 ' size={20} color={ `${state.nightDayMode===true?"white":"rgb(0 0 0 / 0.8)"} `}  />
                    <p className={`ml-3 font-[600] ${state.nightDayMode===true?"text-[white]":"text-gray-600/70 "}`}>{state.UserData.Location}</p>
                </div>
                <div className='flex mt-1'>
                    <MdWorkOutline size={20} className='mt-1 ' color={ `${state.nightDayMode===true?"white":"rgb(0 0 0 / 0.8)"} `} />
                    <p className={`ml-3 font-[600] ${state.nightDayMode===true?"text-[white]":"text-gray-600/70 "}`}>{state.UserData.Occupation}</p>
                </div>
            </div>
        <Divider  />
            <div>
                <div className={`flex ${state.nightDayMode===true?"text-[white]":"text-gray-600/70 "} justify-between`}>
                    <p>
                    Who viewed you profile
                    </p>
                    <p>0</p>
                </div>
                <div className={`flex ${state.nightDayMode===true?"text-[white]":"text-gray-600/70 "} justify-between mt-3`}>
                    <p>
                    Impression of your profile
                    </p>
                    <p>{state.UserData.likeCount}</p>
                </div>
            </div>
            <div>

            </div>
        </div>
    </div>
    :
    <img src={loader} alt="" className='w-[50px]'/>
    }
    </>
  )
}
function ConvertToBase64(file){
    return new Promise((resolve,reject)=>{
      const fileReader=new FileReader()
      fileReader.readAsDataURL(file)
      fileReader.onload=()=>{
        resolve(fileReader.result)
      }
      fileReader.onerror=(err)=>{
        reject(err)
      }
    })
  }