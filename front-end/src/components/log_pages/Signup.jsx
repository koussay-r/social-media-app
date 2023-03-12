import React, { useState } from 'react'
import axios from "axios"
import { Link, useNavigate } from 'react-router-dom'
import {motion} from 'framer-motion'
export default function Signup() {
    const navigate=useNavigate()
    const [lackData,setLackData]=useState(false)
const [CreateUser,SetCreateUser]=useState({
    name:"",
    LastName:"",
    Location:"",
    Occupation:"",
    email:"",
    password:"",
    pfp:""

})
const [userCreated,SetUserCreated]=useState({
    succes:false,
    failure:false,
    action:null,

})
const handleLackData=(e)=>{
    e.preventDefault()
    setLackData(true)
    const timer=()=>{setTimeout(()=>{
      setLackData(false)
  },1500)}
  timer()
  clearTimeout(timer)
  }
const handlePassword=(e)=>{
    SetCreateUser({...CreateUser,password:e.target.value})
}
const handleEmail=(e)=>{
    SetCreateUser({...CreateUser,email:e.target.value})
}
const handleName=(e)=>{
    SetCreateUser({...CreateUser,name:e.target.value})
}
const handleLastName=(e)=>{
    SetCreateUser({...CreateUser,LastName:e.target.value})
}
const handleOccupation=(e)=>{
    SetCreateUser({...CreateUser,Occupation:e.target.value})
}
const handleLocation=(e)=>{
    SetCreateUser({...CreateUser,Location:e.target.value})
    
}
const handleCreateUser=async(e)=>{
    e.preventDefault()   
    const handleCreate=()=>{
        try{
            axios.post("http://localhost:9000/createUser",CreateUser)
            SetUserCreated({...userCreated,succes:true,action:true})
            const timer=()=>{setTimeout(()=>{
                SetUserCreated({...userCreated,succes:false})
                navigate('/')
            },2000)}
            timer()
            clearTimeout(timer)
            SetCreateUser({...CreateUser,name:"",LastName:"",Location:"",Occupation:"",email:"",password:""})
            
        }
        catch(err){
            console.log(err)
        }
    }
    try{
        const res=await axios.post("http://localhost:9000/createUser/exist",{email:CreateUser.email})
        if(res.data.length===0){
            handleCreate()
        }
        else{
            SetUserCreated({...userCreated,failure:true,action:false})
            const timer=()=>{setTimeout(()=>{  
                SetUserCreated({...userCreated,failure:false})
            },1500)}
            timer()
            clearTimeout(timer)
        }
    }
    catch(err){
        console.log(err)
    }
}
  return (
    <div className='mx-auto block'>
      
        <header className='text-center font-bold text-[#04d0fa] bg-white w-full pb-3 shadow-sm pt-3 text-4xl'>
            Sociopedia
        </header>
        <motion.div 
        initial={!userCreated.succes||!userCreated.failure?"hidden":"visible"}
        whileInView={userCreated.succes||userCreated.failure?"visible":"hidden"}
        viewport={{once:true,amount:0.5}}
        transition={{delay:0.4,duration:0.4}}
        variants={{
            hidden:{opacity:0,y:0},
            visible:{opacity:1,y:20}
        }}
         className={`py-1 block ${!userCreated.action?"bg-red-500" : "bg-green-500"}  font-[600] rounded-md  text-black mb-2 text-sm font-quicksand md:text-xl mx-auto w-[60%] md:w-[40%] text-center`}>
        {
            userCreated.action?
            <>
        User created succefully
            </>
            :
            <>
            User already exists
            </>}
        </motion.div >
        <form className='block mx-auto bg-white px-6 py-3 rounded-lg shadow-md mt-10 w-[80%] md:w-[70%] md:mt-7'>
            <p className='text-black/90 font-[600]'>Welcome to Sociopedia, the plateform for sociopaths</p>
            <div className='flex w-full justify-center gap-3'>
            <div className='w-full'>
            <p className={`${(lackData&&CreateUser.name.length===0)?"text-red-600":"text-gray-900"} font-[600] px-[1px] h-fit translate-y-[18px] translate-x-[6px] bg-white w-fit`}>First Name</p>
            <input value={CreateUser.name} onChange={handleName} type={'text'} className=" py-5 focus:border-[#04d0fa] shadow-sm border rounded focus:bg-gray-100 border-gray-300 pl-3 w-full h-8 mt-2"/>
            </div>
            <div className='w-full'>
            <p className={`${(lackData&&CreateUser.LastName.length===0)?"text-red-600":"text-gray-900"} font-[600] px-[1px] bg-white w-fit translate-y-[17px] translate-x-[6px] `}>Last Name</p>
            <input value={CreateUser.LastName} onChange={handleLastName} type={'text'} className="py-5 focus:border-[#04d0fa] shadow-sm border rounded focus:bg-gray-100 border-gray-300 pl-3 w-full h-8 mt-2"/>
            </div>
            </div>
            <p className={`${(lackData&&CreateUser.Location.length===0)?"text-red-600":"text-gray-900"} font-[600] px-[1px] bg-white w-fit translate-y-[17px]  translate-x-[6px] `}>Location</p>
            <input value={CreateUser.Location} onChange={handleLocation} type={'text'} className="py-5 focus:border-[#04d0fa] shadow-sm border  rounded focus:bg-gray-100 border-gray-300  pl-3 w-full h-8 mt-2"/>
            <p className={`${(lackData&&CreateUser.Occupation.length===0)?"text-red-600":"text-gray-900"} font-[600] px-[1px] bg-white w-fit translate-y-[17px]  translate-x-[6px]`}>Occupation</p>
            
            <input value={CreateUser.Occupation} onChange={handleOccupation} type={'text'} className="py-5 focus:border-[#04d0fa] shadow-sm border  rounded focus:bg-gray-100 border-gray-300  pl-3 w-full h-8 mt-2"/>
            <p className={`${((lackData&&CreateUser.email.length===0)||(lackData&&CreateUser.email.indexOf("@")===-1))?"text-red-600":"text-gray-900"} font-[600] px-[1px] bg-white w-fit translate-y-[17px]  translate-x-[6px]`}>Email</p>
            <input value={CreateUser.email} onChange={handleEmail} type={'email'} className="py-5 focus:border-[#04d0fa] shadow-sm border  rounded focus:bg-gray-100 border-gray-300  pl-3 w-full h-8 mt-2"/>
            <p className={`${(lackData&&CreateUser.password.length===0)?"text-red-600":"text-gray-900"} font-[600] px-[1px] bg-white w-fit translate-y-[17px]  translate-x-[6px]`}>Password</p>
            <input value={CreateUser.password} onChange={handlePassword} type={'password'} className="py-5 focus:border-[#04d0fa] shadow-sm border  rounded focus:bg-gray-100 border-gray-300  pl-3 w-full h-8 mt-2"/>
            <button onClick={(CreateUser.LastName.length!==0&&CreateUser.name.length!==0&&CreateUser.Occupation.length!==0&&CreateUser.Location.length!==0&&CreateUser.email.length!==0&&CreateUser.password.length!==0&&CreateUser.email.indexOf("@")!==-1)?handleCreateUser:handleLackData} className='mt-4 bg-[#04d0fa] rounded-md py-2 text-white block mx-auto w-full'>Register</button>
            <Link to='/'><p className='mt-2 w-fit text-blue-700 hover:text-blue-400 cursor-pointer underline'>You have an account yet? Login in here</p></Link>
          
        </form>
    </div>
  )
}
