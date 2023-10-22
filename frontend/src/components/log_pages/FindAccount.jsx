import axios from 'axios'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export default function FindAccount() {
    const [fillInputFiled,setFillInputFiled] =useState(false)
    const [accountNotfound,setAccountNotfound]=useState(false)
    const [input,SetInput]=useState("")
    const [accountFound,setAccountFound]=useState({})
    const handleInput=(e)=>{
        SetInput(e.target.value)
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
  return (
    <div className='mx-auto bg-[#e9ebee] h-[100vh] block'>
        <header className='text-center font-bold text-[#04d0fa] bg-white w-full pb-3 shadow-sm pt-3 text-4xl'>
            Sociopedia
        </header>
        <form className='block mx-auto bg-white pt-3 pb-1  rounded-lg shadow-md mt-[50%] w-[90%] md:w-[40%] md:mt-24'>
            <p className='font-bold p-3 text-[20px]'>Find your account</p>
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
            <div className='flex gap-2 p-3 justify-end'>
               <Link to="/"><button className='bg-[#e4e6eb] rounded-lg p-3 font-semibold'>Cancel</button></Link>
                <button onClick={handleFindAccount} className='bg-[#1877f2] hover:bg-opacity-80 text-white rounded-lg p-3 font-semibold'>Search</button>
            </div>
        </form>
    </div>
  )
}
