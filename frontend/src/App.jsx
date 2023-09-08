import React, { createContext, useEffect, useState } from 'react'
import Login from './components/log_pages/Login'
import Signup from './components/log_pages/Signup'
import {BrowserRouter ,Route,Routes, useNavigate} from 'react-router-dom'
import Home from './components/Home/Home'
import {Toaster} from 'react-hot-toast'
import axios from 'axios'
export const AuthenticatedContext=createContext()
export default function App() {
  const [auth,setAuth]=useState(false)
  const [UserData,setUserData]=useState()
  const [accountExistCookies,setAccountExistCookies]=useState(localStorage.getItem("account")===null?false:true)
  useEffect(()=>{
    const loginIn=async()=>{
      if(accountExistCookies){
        const savedData=JSON.parse(localStorage.getItem("account"))
        try{
          const res=await axios.post("http://localhost:9000/createUser/login",{email:savedData.email,password:savedData.password})
          setUserData(res.data[0])
          setAuth(true)
        }
        catch(err){
          console.log(err)
        }
      }
    }
    loginIn()
  },[])
  return (
    <>
    <BrowserRouter>
    
      <AuthenticatedContext.Provider value={[auth,setAuth,UserData,setUserData]}>
    <Toaster
  position="top-center"
  reverseOrder={false}
/>
    <Routes>
      {
        accountExistCookies?<Route path='/' index element={auth&&<Home/>}/>:<Route path='/' index element={<Login/>}/>
      }
       
       <Route path="/signup" element={<Signup/>}/>
       <Route path='/home' element={auth&&<Home/>}/>
       </Routes>
        </AuthenticatedContext.Provider>
    </BrowserRouter>  
    </>
  )
}
