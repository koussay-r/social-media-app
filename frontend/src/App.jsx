import React, { createContext, useEffect, useState } from 'react'
import Login from './components/log_pages/Login'
import Signup from './components/log_pages/Signup'
import {BrowserRouter ,Route,Routes, useNavigate} from 'react-router-dom'
import Home from './components/Home/Home'
import {Toaster} from 'react-hot-toast'
import axios from 'axios'
import UserProfile from './components/profile/UserProfile'
import MainLoader from './components/MainLoader'
export const AuthenticatedContext=createContext()
export default function App() {
  const [auth,setAuth]=useState(false)
  const [UserData,setUserData]=useState()
  const [LoadingUSerData,setLoadingUSerData]=useState(false)
  const [posts,setPosts]=useState([])
  const [nightDayMode,setNightDayMode]=useState(JSON.parse(localStorage.getItem("mode")))
  const [accountExistCookies,setAccountExistCookies]=useState(localStorage.getItem("account")===null?false:true)
  useEffect(()=>{
    const loginIn=async()=>{
      if(accountExistCookies){
        const savedData=JSON.parse(localStorage.getItem("account"))
        try{
          const res=await axios.post("http://localhost:9000/createUser/login",{email:savedData.email,password:savedData.password})
          setLoadingUSerData(true)
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
    {
      LoadingUSerData===true?
    <BrowserRouter>
    
      <AuthenticatedContext.Provider value={[nightDayMode,setNightDayMode,auth,setAuth,UserData,setUserData,posts,setPosts,accountExistCookies,setAccountExistCookies]}>
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
       <Route path='/profile' element={<UserProfile/>}/>
       </Routes>
        </AuthenticatedContext.Provider>
    </BrowserRouter>  :
    <MainLoader/>
    }
    </>
  )
}
