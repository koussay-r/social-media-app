import { Divider } from '@mui/material'
import React, { useEffect } from 'react'
import { AuthenticatedContext } from '../../App'
import noPfp from './../../assets/noPfp.png'
import {HiOutlineLocationMarker} from 'react-icons/hi'
import loader from './../../assets/loader.gif'
import {MdWorkOutline} from 'react-icons/md'
export default function UserInfo() {
  const [auth,setAuth,UserData,setUserData]=React.useContext(AuthenticatedContext)
  useEffect(()=>{

  },[])
  return (
    <>
    {
        UserData.length!==0?
    <div className='rounded-md border w-[350px] bg-white'>
            <div className='p-3 '>
            <div className='flex mb-3'>
                <img src={noPfp} alt="no pfp" className='rounded-full w-11 h-11'/>
                <div className='ml-3'>
                    <p className='text-black/80 font-[600]'>{UserData[0].name} {UserData[0].LastName}</p>
                    <p className='text-gray-600 font-WorkSans font-[600] text-[11px] ml-2'> 0 friends</p>
                </div>
            </div>
        <Divider  />
            <div className='mt-2 mb-3'>
                <div className='flex '>
                    <HiOutlineLocationMarker className='mt-1 ' size={20} color={"rgb(0 0 0 / 0.8)"} />
                    <p className='ml-3 font-[600] text-gray-600/70'>{UserData[0].Location}</p>
                </div>
                <div className='flex mt-1'>
                    <MdWorkOutline size={20} className='mt-1 ' color={"rgb(0 0 0 / 0.8)"} />
                    <p className='ml-3 font-[600] text-gray-600/70'>{UserData[0].Occupation}</p>
                </div>
            </div>
        <Divider  />
            <div>
                <div className='flex justify-between'>
                    <p>
                    Who's viewed you profile
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
