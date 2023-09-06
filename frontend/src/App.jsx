import React, { createContext, useState } from 'react'
import Login from './components/log_pages/Login'
import Signup from './components/log_pages/Signup'
import {BrowserRouter ,Route,Routes} from 'react-router-dom'
import Home from './components/Home/Home'
import {Toaster} from 'react-hot-toast'
export const AuthenticatedContext=createContext()
export default function App() {
  const [auth,setAuth]=useState(false)
  const [UserData,setUserData]=useState()

  return (
    <>
    <BrowserRouter>
    
      <AuthenticatedContext.Provider value={[auth,setAuth,UserData,setUserData]}>
    <Toaster
  position="top-center"
  reverseOrder={false}
/>
    <Routes>
       <Route path='/' index element={<Login/>}/>
       <Route path="/signup" element={<Signup/>}/>
       <Route path='/home' element={auth&&<Home/>}/>
       </Routes>
        </AuthenticatedContext.Provider>
    </BrowserRouter>  
    </>
  )
}
