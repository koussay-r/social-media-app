import React, {  useEffect } from 'react'
import {useDispatch, useSelector } from 'react-redux'
import Login from './components/log_pages/Login'
import {data} from "./components/redux/user"
import Signup from './components/log_pages/Signup'
import {BrowserRouter ,Route,Routes, useNavigate} from 'react-router-dom'
import Home from './components/Home/Home'
import {Toaster} from 'react-hot-toast'
import axios from 'axios'
import UserProfile from './components/profile/UserProfile'
import MainLoader from './components/MainLoader'
import FindAccount from './components/log_pages/FindAccount'
import ResetPassword from './components/log_pages/ResetPassword'
export default function App() {
  const state=useSelector((state)=>state.user.value)
  const dispatch=useDispatch()
  useEffect(()=>{
    const loginIn=async()=>{
      if(state.accountExistCookies){
        const savedData=JSON.parse(localStorage.getItem("account"))
        try{
          const res=await axios.post("http://localhost:9000/createUser/login",{email:savedData.email,password:savedData.password})
          dispatch(data({
            LoadingUSerData:true,
            UserData:res.data[0],
            auth:true
          }))
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
      (state.LoadingUSerData===true||state.accountExistCookies===false||state.UserData)?
    <BrowserRouter>
    
    <Toaster
  position="top-center"
  reverseOrder={false}
/>
    <Routes>
      {
        state.accountExistCookies?<Route path='/' index element={state.auth&&<Home/>}/>:<Route path='/' index element={<Login/>}/>
      }
       <Route path='/ResetPassword' element={<ResetPassword/>}/>
       <Route path="/findAccount" element={<FindAccount/>}/>
       <Route path="/signup" element={<Signup/>}/>
       <Route path='/home' element={state.auth&&<Home/>}/>
       <Route path={`/profile`} element={<UserProfile/>}/>
       </Routes>
    </BrowserRouter>  :
    <MainLoader/>
    }
    </>
  )
}
