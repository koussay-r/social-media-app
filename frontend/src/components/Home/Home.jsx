import React, { useEffect, useState } from 'react'
import Navbar from '../navbar/navbar'
import {LoadUserPfp} from "./../redux/user"
import Mainprofile from '../accueilComponents/mainprofile'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {fetchGetUserPfp} from "./../redux/user"
export default function Home() {
  const navigate=useNavigate()
  const state=useSelector((state)=>state.user.value)
  const dispatch=useDispatch()
  const [Userpfp,setUserPfp]=useState('')
  useEffect(()=>{
    if(!state.auth){
      navigate("/")
    }
    else{
      dispatch(fetchGetUserPfp(state.UserData._id))
    }
},[])
  return (
    <>
       <Navbar />
       <Mainprofile />
    </>
  )
}
