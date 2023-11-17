import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {motion} from 'framer-motion'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { changeAuth,changeUserData } from '../redux/user'

export default function Login() {
  const [UserExist,SetUserExist]=useState(true)
  const [lackData,setLackData]=useState(false)
  const [accountSaved,SetAccountSaved]=useState(localStorage.getItem("account"))
  const navigate=useNavigate()
  const [UserAccount,setUserAccount]=useState({
    email:"",
    password:""
  })
  const dispatch=useDispatch()
  const state=useSelector((state)=>state.user.value)
  const handleEmail=(e)=>{
    setUserAccount({...UserAccount,email:e.target.value})
  }
  const handlePassword=(e)=>{
    setUserAccount({...UserAccount,password:e.target.value})
  }
  const handleLogin=async(e)=>{
    e.preventDefault()
    try{
      const res=await axios.post("http://localhost:9000/createUser/login",UserAccount)
      if(res.data.length===0){
        SetUserExist(false)
        const timer=()=>{setTimeout(()=>{
          SetUserExist(true)
        },1500)}
        timer()
        clearTimeout(timer)
      }
      else{
        if(accountSaved===null){
          const cookies=confirm("do you want to allways stay loged in?");
          if(cookies&&UserAccount.email.length!==0){
            const accountdata=JSON.stringify(UserAccount)      
            localStorage.setItem("account",accountdata)
          }
        }
        localStorage.setItem("userID",JSON.stringify(res.data[0]._id))
        dispatch(changeAuth(true))
        dispatch(changeUserData(res.data[0]))
        navigate("/home")
        setUserAccount({...UserAccount,email:"",password:""})
      }
    }catch(err){
      toast.error(err.message+" try again !")
    }
  }
  const handleLackData=(e)=>{
    e.preventDefault()
    setLackData(true)
    const timer=()=>{setTimeout(()=>{
      setLackData(false)
  },1500)}
  timer()
  clearTimeout(timer)
  }
  return (
    <div className='mx-auto bg-[#e9ebee] h-[100vh] block'>
      
        <header className='text-center font-bold text-[#04d0fa] bg-white w-full pb-3 shadow-sm pt-3 text-4xl'>
            Sociopedia
        </header>
        <motion.div 
        initial={UserExist?"hidden":"visible"}
        whileInView={!UserExist?"visible":"hidden"}
        viewport={{once:true,amount:0.5}}
        transition={{delay:0.4,duration:0.4}}
        variants={{
            hidden:{opacity:0,y:0},
            visible:{opacity:1,y:20}
        }}
         className={`py-1 block bg-red-500   font-[600] rounded-md  text-black mb-2 text-sm font-quicksand md:text-xl mx-auto w-[60%] md:w-[40%] text-center`}>
        Account not found
        </motion.div >
        <form className='block mx-auto bg-white px-3 py-3 rounded-lg shadow-md mt-8 w-[80%] lg:w-[70%] md:mt-10'>
            <p className='text-black/90 font-[600]'>Welcome to Sociopedia, the plateform for sociopaths</p>
            <p className={` ${(lackData&&UserAccount.email.length===0)?"text-red-600":"text-gray-900"} font-[600] px-[1px] h-fit translate-y-[18px] translate-x-[6px] bg-white w-fit`}>Email</p>
            <input type={'text'} value={UserAccount.email} onChange={handleEmail} className=" py-5 focus:border-[#04d0fa] shadow-sm border rounded focus:bg-gray-100 border-gray-300 pl-3 w-full h-8 mt-2"/>
            <p className={`${(lackData&&UserAccount.password.length===0)?"text-red-600":"text-gray-900"} font-[600] px-[1px] bg-white w-fit translate-y-[17px] translate-x-[6px] `}>Password</p>
            <input value={UserAccount.password} onChange={handlePassword} type={'password'} className="focus:border-[#04d0fa] py-5 shadow-sm border rounded focus:bg-gray-100 border-gray-300 pl-3 w-full h-8 mt-2"/>
            <button onClick={(UserAccount.email.length!==0&&UserAccount.password.length!==0)?handleLogin:handleLackData} className='mt-4 bg-[#04d0fa] rounded-md py-2 text-white block mx-auto w-full'>Login</button>
              <div className='flex justify-between'>
            <Link to='/signup'><p className='mt-2 w-fit text-blue-700 hover:text-blue-400 cursor-pointer underline'>Don't have an account yet? sign up here</p></Link>
            <Link to='/findAccount'><p className='mt-2 w-fit text-blue-700 hover:text-blue-400 cursor-pointer underline'>Forgot password?</p></Link>
              </div>
        </form>
    </div>
  )
}
