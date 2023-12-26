import React, { useEffect } from 'react'
import Navbar from '../navbar/navbar'
import Mainprofile from '../accueilComponents/mainprofile'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
export default function Home() {
  const navigate=useNavigate()
  const state=useSelector((state)=>state.user.value)
  useEffect(()=>{
    if(!state.auth){
      navigate("/")
    }
    else{
      const handleGetUserPfp=async()=>{
          try {
              
          } catch (error) {
              console.log(error.message)
          }
      }
      handleGetUserPfp()
    }
},[])
  return (
    <>
       <Navbar/>
       <Mainprofile />
    </>
  )
}
