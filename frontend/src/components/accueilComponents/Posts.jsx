import React, { useState } from 'react'
import { BsThreeDots } from 'react-icons/bs'
import nopfp from './../../assets/noPfp.png'
import {motion} from 'framer-motion'
import {FaRegComment} from 'react-icons/fa'
import {AiFillHeart,AiOutlineHeart} from 'react-icons/ai'
import { Divider } from '@mui/material'
import axios from 'axios'
import { AuthenticatedContext } from '../../App'
import { FiSend } from 'react-icons/fi'
import { toast } from "react-hot-toast";
import { Link } from 'react-router-dom'

export default function Posts(props) {
  const [postliked,setPostLiked]=useState(props.UsersLikes.includes(props.currentUser))
  const [likesnumber,setLikesNumber]=useState(props.likes)
  const [Makecomment,setMakeComment]=useState("")
  const [comments,setComments]=useState(props.comments)
    const [nightDayMode,setNightDayMode,auth, setAuth, UserData, setUserData,posts,setPosts] =React.useContext(AuthenticatedContext);
  const handlecomment=(e)=>{
    setMakeComment(e.target.value)

  }
  const handleAddLikes=async()=>{
    setPostLiked(!postliked)
    if(postliked){
      setLikesNumber(likesnumber-1)
    }
    else{
      setLikesNumber(likesnumber+1)
    } 
    try{
      await axios.put(`http://localhost:9000/posts/Likes/${postliked?0:1}`,{_id:props._id,userId:props.userId})
    }catch(err){
      console.log(err)
    }
  }
  const hanldeMakeComment=async(e)=>{
    e.preventDefault()
    comments.push(Makecomment)
    setMakeComment("")
    try{
      if(Makecomment!==""){
        const res=await axios.post("http://localhost:9000/posts/makeComment",{_id:props._id,userId:UserData._id,name:UserData.name,comment:Makecomment,picture:UserData.pfp})
        toast.success('Comment added Successfully !')
      }
    }catch(err){
      console.log(err)
    }
  }
  const focusToComment=()=>{
    document.getElementById(props._id).focus()
  }
  const handleGoToProfile=async()=>{
    try{
      const res=await axios.post(`http://localhost:9000/posts/`,{userId:props.userId})
      console.log(res.data)
      const res2=await axios.post("http://localhost:9000/Users/findUserById",{_id:props.userId})
      setUserData(res2.data[0])
      setPosts(res.data)
  }
  catch(err){
      console.log(err)
  }
  }
  return (
    <motion.div 
    initial={"hidden"}
    whileInView={"visible"}
    viewport={{once:true,amount:0.5}}
    transition={{delay:0.4,duration:0.4}}
    variants={{
        hidden:{opacity:0,y:20},
        visible:{opacity:1,y:0}
    }} className={`${nightDayMode===true?"bg-[#242526]":"bg-white "} px-3 mt-4 p-3  block mx-auto md:mx-0 shadow w-full rounded-lg`}>
      <div className='flex justify-between'>
      <div className='flex gap-2'>
        <img src={props.pfp===''?nopfp:props.pfp} alt="" className='rounded-full mt-[4px] w-10 h-10'/>
        <div>
         <Link to={"/profile"}> <p onClick={handleGoToProfile} className={`text-md cursor-pointer font-bold text-black/70 ${nightDayMode===true?"text-white":"text-black "} `}>{props.name}</p></Link>
          <p className={`'text-[12px] text-gray-500/80 font-bold ${nightDayMode===true?"text-[white]":"text-black "} ml-1'`}>{props.Location}</p>
        </div>
      </div>
      <BsThreeDots size={23} className={`${nightDayMode===true?"text-[white]":"text-black "} mt-[10px] cursor-pointer`}/>
      </div>
      <p className={`'ml-1 mt-2 pb-3 font-[600] font-quicksand ${nightDayMode===true?"text-[white]":"text-black "} '`}>{props.caption}</p>
      {
        props.picture!==""&&
        <img src={props.picture} alt="" className='rounded-md object-cover mb-3'/>
      }
      {
        likesnumber===0?
        <p className={`'flex text-md font-semibold ${nightDayMode===true?"text-[white]":"text-black "} pb-2'`}>Be the First to like this Post !</p>
        :
        <p className={`flex text-sm pb-1 ${nightDayMode===true?"text-[white]":"text-black "} `}><AiFillHeart className='mt-[2px] mr-[2px] text-red-500' size={19}  />{likesnumber} users Loved this post</p>

      }
      <Divider/>
      <div className='flex gap-2 justify-between my-1'>
        <div className={`w-full rounded-lg ${nightDayMode===true?"hover:bg-white/10":"hover:bg-gray-100 "} `}>
        <div onClick={handleAddLikes} className='flex p-1 justify-center cursor-pointer'>
        {
          postliked?
          <AiFillHeart className='mt-[2px] mr-1 text-red-500' size={25}  />
          :
          <AiOutlineHeart className={`' ${nightDayMode===true?"text-[white]":"text-black "} mr-1 mt-[2px]'`} size={25}  />          
        }<p className={`'ml-1 text-black/80 ${nightDayMode===true?"text-white":"text-black "} font-bold text-lg'`}>Love</p>
        </div>
        </div>
        <div className={` rounded-lg ${nightDayMode===true?"hover:bg-white/10":"hover:bg-gray-100 "} w-full`}>
        <div onClick={focusToComment} className='flex justify-center p-1 cursor-pointer'>
          <FaRegComment  className={`${nightDayMode===true?"text-[white]":"text-black "} mt-[2px]`} size={25}/><p className={`ml-1 ${nightDayMode===true?"text-white":"text-black "} text-black/80 font-bold text-lg`}>Comment</p>
        </div>
        </div>
      </div>
      <Divider/>
      <div className={`max-h-[200px] ${comments.length===0?"hidden":"block"} overflow-y-auto`}>
        {
          comments.map(item=>{
            return(
              <div className='flex py-2' key={item._id+Math.floor(Math.random()*1500).toString()}>
                <img src={item.picture?item.picture:nopfp} alt="" className='rounded-full mt-[7px] w-7 h-7'/>
                <div className='bg-gray-200 rounded-md mx-2 p-2'>
                  <p className='text-black text-sm mb-2'>{item.name}</p>
                  <p className='text-black/80 text-md font-semibold font-Montserrat '>{item.comment}</p>
                </div>
              </div>
            )
          })
        }
      </div>
      <div>
        <form onSubmit={hanldeMakeComment}>

        <div className='flex mt-1'>
        <img src={UserData.pfp?UserData.pfp:nopfp} alt="" className='rounded-full mt-[7px] w-7 h-7'/>
        <input id={props._id} value={Makecomment} onChange={handlecomment} type="text" placeholder='Write a Comment !' className={`w-full rounded-xl h-7 ${nightDayMode===true?"bg-[#3a3b3c] text-white":"bg-gray-200 border border-gray-500 text-black "}  focus:border-transparent pl-3 mt-2 mx-2`}/>
        <FiSend onClick={hanldeMakeComment} size={22} color={"#04d0fa"} className='mt-[12px] cursor-pointer'/>
        </div>
        </form>
      </div>

    </motion.div>
  )
}
