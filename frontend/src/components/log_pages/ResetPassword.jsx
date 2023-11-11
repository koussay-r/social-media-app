import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { recoveryCodeContext } from '../../App'
import axios from 'axios'

export default function ResetPassword() {
  const [recoveryCode,setRecoveryCode,email,setEmail]=useContext(recoveryCodeContext)
  const [fillInputFiled,setFillInputFiled] =useState(false)
  const [input,setInput]=useState("")
  const [wrongCode,setWrongCode]=useState(false)
  const [checkDone,setCheckdone] = useState(false)
  const [loader,setLoader]=useState(false)
  const handleInput=(e)=>{
    setInput(e.target.value)
    if(fillInputFiled===true||wrongCode===true){
        setFillInputFiled(false)
        setWrongCode(false)
    }
    if(input.length===4){
      if(input===recoveryCode){
        setCheckdone(true)
      }
      else{
        setWrongCode(true)
        setFillInputFiled("")
      }
    }
}

  const fillField=()=>{
  setFillInputFiled(true)
}
  const handleChangePassword=async()=>{
    try{
      setLoader(true)
      const res=await axios.post("http://localhost:")
    }
    catch(err){
      console.log(err.message)
    }
  }
  return (
    <div className='mx-auto bg-[#e9ebee] h-[100vh] block'>
    <header className='text-center font-bold text-[#04d0fa] bg-white w-full pb-3 shadow-sm pt-3 text-4xl'>
        Sociopedia
    </header>
    <form className='block mx-auto bg-white pt-3 pb-1  rounded-lg shadow-md mt-[50%] w-[90%] lg:w-[40%] md:mt-24'>
            <p className='font-bold p-3 text-[20px]'>Find your account</p>
            <div className='border border-gray-500 px-5 border-l-transparent border-r-transparent py-4'>
              {
                checkDone?
                <div>
                <p className=' text-black/80 font-semibold text-[18px]'>Please enter your new Password.</p>
                </div>
                :

              <div>
                <p className=' text-black/80 font-semibold text-[18px]'>Please enter Recovery code.</p>
                <div className={`bg-[#ffebe8] border ${fillInputFiled===false?"hidden":"block"} border-[#e04b23] px-3  mb-3 py-2`}>
                    <p className='font-semibold'>Please fill in the four digits</p>
                    <p className='text-[13px]'>Fill in the four digits to proceed</p>
                </div>
                <div className={`bg-[#ffebe8] border ${wrongCode===false?"hidden":"block"} border-[#e04b23] px-3  mb-3 py-2`}>
                    <p className='font-semibold'>Wrong Code !!</p>
                    <p className='text-[13px]'>The Code you entred is Wrong. Please try again !</p>
                </div>
              </div>
              }
                {
                  checkDone?
                <input onChange={handlePassordInput}  className='border p-[14px] rounded w-full mt-4 block focus:border-[#04d0fa] border-gray-400  mx-auto' type='text' placeholder="Enter New Password..."/>
                  :
                  <input onChange={handleInput}  className='border p-[14px] px-[100px] text-bold text-[25px] rounded w-[50%] mt-4 block focus:border-[#04d0fa] border-gray-400 tracking-widest mx-auto'  placeholder="####"/>
                }
            </div>
            <div className='flex gap-2 p-3 justify-end'>
                    <Link to="/"><button type='reset' className='bg-[#e4e6eb] rounded-lg p-3 font-semibold'>Cancel</button></Link>
                   {
                    !checkDone?
                    input.length===4?
                    <button   className='bg-[#1877f2] bg-opacity-70 hover:bg-opacity-80 text-white rounded-lg p-3 font-semibold'>Submiting...</button>
                    :  
                    <button onClick={fillField}  className='bg-[#1877f2]  hover:bg-opacity-80 text-white rounded-lg p-3 font-semibold'>Submit</button>
                  :
                  <button onClick={handleChangePassword}  className='bg-[#1877f2]  hover:bg-opacity-80 text-white rounded-lg p-3 font-semibold'>Submit</button>

                  }
                       
            </div>
                    
        </form>
    </div>
  )
}
