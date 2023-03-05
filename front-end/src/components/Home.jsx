import React from 'react'
import Navbar from './feedComponents/navbar'
import {BrowserRouter ,Route,Routes} from 'react-router-dom'
import Mainprofile from './profile/mainprofile'
export default function Home() {
  return (
    <>
       <Navbar/>
       <Mainprofile/>
    </>
  )
}
