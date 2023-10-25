import axios from 'axios'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import noPfp from "./../../assets/noPfp.png"
import { toast } from 'react-hot-toast'
import { AuthenticatedContext } from '../../App'
export default function FindAccount() {
    const [fillInputFiled,setFillInputFiled] =useState(false)
    const [accountNotfound,setAccountNotfound]=useState(false)
    const [input,SetInput]=useState("")
    const [accountFound,setAccountFound]=useState(null)
    const [nightDayMode,setNightDayMode,auth,setAuth,UserData,setUserData,posts,setPosts,accountExistCookies,setAccountExistCookies,profileUser,setProfileUser,emailRecoverPassword,setEmailRcoverPassword]=React.useContext(AuthenticatedContext);

    const handleInput=(e)=>{
        SetInput(e.target.value)
        if(fillInputFiled===true){
            setFillInputFiled(false)
        }
    }
    const handleFindAccount=async(e)=>{
        if(accountNotfound===true){
            setAccountNotfound(!accountNotfound)
        }
        e.preventDefault()
        if(input.length===0){
            setFillInputFiled(true)
        }else{
            try {
                const ress=await axios.post("http://localhost:9000/Users/findLostAccount",{email:input})
                if(ress.data===false){
                    setAccountNotfound(true)
                }
                else{
                    setAccountFound(ress.data)
                }
            } catch (error) {
                console.log(error)
            }
        }
    }
    const handleSendEmailforPAsswordRecovery=async()=>{
        try {
            const random_code=Math.floor(Math.random()*9999)+1;
            const result = await toast.promise(await axios.post(`http://localhost:9000/Users/resetPassword/${random_code}`,{email:emailRecoverPassword}), {
                loading: 'Sending Recovery Code...',
                success: <b>Recovery code has been sent successfully!</b>,
                error: <b>Failed to send Recovery code Try again1.</b>,
            });
        } catch (error) {
            console.log(error)
        }
    }
  return (
    <div className='mx-auto bg-[#e9ebee] h-[100vh] block'>
        <header className='text-center font-bold text-[#04d0fa] bg-white w-full pb-3 shadow-sm pt-3 text-4xl'>
            Sociopedia
        </header>
        <form className='block mx-auto bg-white pt-3 pb-1  rounded-lg shadow-md mt-[50%] w-[90%] lg:w-[40%] md:mt-24'>
            <p className='font-bold p-3 text-[20px]'>Find your account</p>
            {
                accountFound===null?
            <div className='border border-gray-500 px-5 border-l-transparent border-r-transparent py-4'>
                <div className={`bg-[#ffebe8] border ${fillInputFiled===false?"hidden":"block"} border-[#e04b23] px-3  mb-3 py-2`}>
                    <p className='font-semibold'>Please fill in at least one field</p>
                    <p className='text-[13px]'>Fill in at least one field to search for your account</p>
                </div>
                <div className={`bg-[#ffebe8] border ${accountNotfound===false?"hidden":"block"} border-[#e04b23] px-3 mx-3 mb-3 py-2`}>
                    <p className='font-semibold'>No Search Results</p>
                    <p className='text-[13px]'>Your search did not return any results. Please try again with other information.</p>
                </div>
                <p className=' text-black/80 font-semibold text-[18px]'>Please enter your email or mobile number to search for your account.</p>
                <input  onChange={handleInput} className='border p-[14px] rounded w-full mt-4 block focus:border-[#04d0fa] border-gray-400  mx-auto' type='text' placeholder="Enter your email..."/>
            </div>
            :
            <div className='border border-gray-500 px-5 border-l-transparent border-r-transparent py-4'>
            <p className='font-semibold text-md'>This account matched your search.</p>
            <div className='flex mt-5 justify-between'>
                <div className='flex gap-4'>
                    <img src={accountFound.pfp===""?noPfp:accountFound.pfp} className='rounded-full cursor-pointer w-11 h-11'/>
                    <div>
                        <p className='font-semibold text-black/80'>{accountFound.name}</p>
                        <p className='text-[12px]'>Sociomedia user</p>
                    </div>
                </div>
               <Link to="/ResetPassword"><button onClick={handleSendEmailforPAsswordRecovery}  className='bg-[#e4e6eb] lg:text-[16px] text-[14px]  text-slate-800 rounded-lg p-3 font-semibold'>This Is My Account</button></Link> 
            </div>
            </div>
            }
                {
                    accountFound===null?
            <div className='flex gap-2 p-3 justify-end'>
                    <Link to="/"><button className='bg-[#e4e6eb] rounded-lg p-3 font-semibold'>Cancel</button></Link>
                     <button onClick={handleFindAccount} className='bg-[#1877f2] hover:bg-opacity-80 text-white rounded-lg p-3 font-semibold'>Search</button>
            </div>
                     :
                     <div className='flex gap-2 p-3 justify-end'>
                    <Link to="/"><button className='bg-[#e4e6eb] rounded-lg p-3 font-semibold'>back</button></Link>
                    </div>
                }
        </form>
    </div>
  )
}
