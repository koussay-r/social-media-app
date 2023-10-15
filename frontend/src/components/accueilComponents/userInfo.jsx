import { Divider } from '@mui/material'
import React, { useState } from 'react'
import { AuthenticatedContext } from '../../App'
import noPfp from './../../assets/noPfp.png'
import {HiOutlineLocationMarker} from 'react-icons/hi'
import {MdWorkOutline} from 'react-icons/md'
import { Link, useLocation  } from 'react-router-dom'
import axios from 'axios'

export default function UserInfo() {
    const location=useLocation ()
 const [nightDayMode,setNightDayMode,auth, setAuth, UserData, setUserData,posts,setPosts]=React.useContext(AuthenticatedContext)
 const [loader,SetLoader]=useState(false) 

 const HandleProfile=async()=>{
    try{
        const res=await axios.post(`http://localhost:9000/posts/`,{userId:UserData._id})
        setPosts(res.data)
    }
    catch(err){
        console.log(err)
    }
  }
  const handleChangePfp=async(event)=>{
    const base64=await ConvertToBase64(event.target.files[0])
    setUserData({...UserData,pfp:base64})
    try {
        SetLoader(true)
        const res=await axios.post(`http://localhost:9000/createUser/updatePfp/${UserData._id}`,{pfp:base64})
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
  return (
    <>
    {
        UserData.length!==0?
    <div id='' className={`rounded-lg  shadow-sm  ${location.pathname==='/home'?"hidden md:block":"block md:mx-0 mx-auto"} w-[350px]  ${nightDayMode===true?"bg-[#242526]":"bg-white border "}`}>
            <div className='p-3 '>
            <div className='flex mb-3'>
                {
                    (location.pathname==='/profile'&&UserData._id===JSON.parse(localStorage.getItem("userID")))?
                    <div>
                        <label
              htmlFor="file-upload"
            >
                        <img  src={UserData.pfp===""?noPfp:UserData.pfp} alt="no pfp" className='rounded-full cursor-pointer w-11 h-11'/>
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
                    <img src={UserData.pfp===""?noPfp:UserData.pfp} alt="no pfp" className='rounded-full w-11 h-11'/>
                }
                <div className=' ml-3'>
                    <Link to={"/profile"}><p onClick={HandleProfile} className={`${nightDayMode===true?"text-[white]":"text-black/80 "} hover:text-gray-600 cursor-pointer font-[600]`}>{UserData.name} {UserData.LastName}</p></Link> 
                    <p className={` ${nightDayMode===true?"text-[white]":"text-gray-600 "} font-WorkSans font-[600] text-[11px] ml-2`}> {UserData.friendsList.length} friends</p>
                </div>
            </div>
        <Divider  />
            <div className='mt-2 mb-3'>
                <div className='flex '>
                    <HiOutlineLocationMarker className='mt-1 ' size={20} color={ `${nightDayMode===true?"white":"rgb(0 0 0 / 0.8)"} `}  />
                    <p className={`ml-3 font-[600] ${nightDayMode===true?"text-[white]":"text-gray-600/70 "}`}>{UserData.Location}</p>
                </div>
                <div className='flex mt-1'>
                    <MdWorkOutline size={20} className='mt-1 ' color={ `${nightDayMode===true?"white":"rgb(0 0 0 / 0.8)"} `} />
                    <p className={`ml-3 font-[600] ${nightDayMode===true?"text-[white]":"text-gray-600/70 "}`}>{UserData.Occupation}</p>
                </div>
            </div>
        <Divider  />
            <div>
                <div className={`flex ${nightDayMode===true?"text-[white]":"text-gray-600/70 "} justify-between`}>
                    <p>
                    Who viewed you profile
                    </p>
                    <p>0</p>
                </div>
                <div className={`flex ${nightDayMode===true?"text-[white]":"text-gray-600/70 "} justify-between mt-3`}>
                    <p>
                    Impression of your profile
                    </p>
                    <p>{UserData.likeCount}</p>
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