import { Divider } from '@mui/material'
import React from 'react'
import { AuthenticatedContext } from '../../App'
import noPfp from './../../assets/noPfp.png'
import {HiOutlineLocationMarker} from 'react-icons/hi'
import loader from './../../assets/loader.gif'
import {MdWorkOutline} from 'react-icons/md'
import { Link, useLocation  } from 'react-router-dom'
import axios from 'axios'

export default function UserInfo() {
    const location=useLocation ()
 const [auth, setAuth, UserData, setUserData,posts,setPosts]=React.useContext(AuthenticatedContext)
  const HandleProfile=async()=>{
    try{
        const res=await axios.post(`http://localhost:9000/posts/`,{userId:UserData._id})
        setPosts(res.data)
    }
    catch(err){
        console.log(err)
    }
  }
  return (
    <>
    {
        UserData.length!==0?
    <div id='' className={`rounded-lg  shadow-sm border ${location.pathname==='/home'?"hidden md:block":"block md:mx-0 mx-auto"} w-[350px]  bg-white`}>
            <div className='p-3 '>
            <div className='flex mb-3'>
                <img src={UserData.pfp===""?noPfp:UserData.pfp} alt="no pfp" className='rounded-full w-11 h-11'/>
                <div className=' ml-3'>
                    <Link to={"/profile"}><p onClick={HandleProfile} className='text-black/80  hover:text-gray-600 cursor-pointer font-[600]'>{UserData.name} {UserData.LastName}</p></Link> 
                    <p className='text-gray-600 font-WorkSans font-[600] text-[11px] ml-2'> {UserData.friendsList.length} friends</p>
                </div>
            </div>
        <Divider  />
            <div className='mt-2 mb-3'>
                <div className='flex '>
                    <HiOutlineLocationMarker className='mt-1 ' size={20} color={"rgb(0 0 0 / 0.8)"} />
                    <p className='ml-3 font-[600]  text-gray-600/70'>{UserData.Location}</p>
                </div>
                <div className='flex mt-1'>
                    <MdWorkOutline size={20} className='mt-1 ' color={"rgb(0 0 0 / 0.8)"} />
                    <p className='ml-3 font-[600] text-gray-600/70'>{UserData.Occupation}</p>
                </div>
            </div>
        <Divider  />
            <div>
                <div className='flex justify-between'>
                    <p>
                    Who viewed you profile
                    </p>
                    <p>0</p>
                </div>
                <div className='flex justify-between mt-3'>
                    <p>
                    Impression of your profile
                    </p>
                    <p>0</p>
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
