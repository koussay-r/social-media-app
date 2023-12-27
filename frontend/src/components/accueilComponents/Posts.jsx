import React, { useEffect, useState } from 'react'
import { BsThreeDots } from 'react-icons/bs'
import nopfp from './../../assets/noPfp.png'
import {motion} from 'framer-motion'
import {FaRegComment} from 'react-icons/fa'
import {AiFillHeart,AiOutlineHeart} from 'react-icons/ai'
import { Divider } from '@mui/material'
import axios from 'axios'
import { FiSend } from 'react-icons/fi'
import { toast } from "react-hot-toast";
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {changePostsToNone} from "./../redux/postsSlice"
import Modal from '@mui/joy/Modal';
export default function Posts(props) {
  const [postliked,setPostLiked]=useState(props.UsersLikes.includes(props.currentUser))
  const [likesnumber,setLikesNumber]=useState(props.likes)
  const [Makecomment,setMakeComment]=useState("")
  const [comments,setComments]=useState(props.comments)
  const [postUserPfp,setPostUserPfp]=useState("")
  const [layout, setLayout] = useState(undefined);
  const [postPicture,setPostPicture]=useState({
    picture:""
  })
  const state=useSelector((state)=>state.user.value)
  const dispatch=useDispatch()
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
      await axios.put(`http://localhost:9000/posts/Likes/${postliked?0:1}`,{_id:props._id,userId:props.userId,currentUser:props.currentUser})
    }catch(err){
      console.log(err)
    }
  }
  const hanldeMakeComment=async(e)=>{
    e.preventDefault()
    if(Makecomment===""){
      toast.error("make a Comment !!")
    }
    else{
    comments.push(Makecomment)
    setMakeComment("")
    try{
      if(Makecomment!==""){
        await axios.post("http://localhost:9000/posts/makeComment",{_id:props._id,userId:state.UserData._id,name:state.UserData.name,comment:Makecomment,picture:state.UserData.pfp})
        toast.success('Comment added Successfully !')
      }
    }catch(err){
      toast.error(err+" Try again !!S")
    }}
  }
  const focusToComment=()=>{
    document.getElementById(props._id).focus()
  }
  useEffect(()=>{
    const getPostUserpfp=async()=>{
        try{
          if(props.userId!==props.currentUser){
            setPostUserPfp(state.UserData.pfp)
          }
          else{
            const response=await axios.post("http://localhost:9000/posts/getPostUserpfp",{PostUserId:props.userId},{
              responseType: 'blob',
            })
            const reader = new FileReader();
            reader.onload = () => {
              setPostUserPfp(reader.result);
            }
            reader.readAsDataURL(response.data);

          }
          if(props.withPicture){
            const response = await axios.post("http://localhost:9000/posts/getPostUserPicture",{PostId:props._id}, {
              responseType: 'blob',
            });
            const reader = new FileReader();
            reader.onload = () => {
            setPostPicture({...postPicture,picture:reader.result})    
            };
            reader.readAsDataURL(response.data);
          }
        }
        catch(Err){
          console.log(Err.message)
        }
      
    }
    getPostUserpfp()
  },[])
  const handleEmptyPosts=()=>{
    dispatch(changePostsToNone())
}
  return (
    <>
    <motion.div 
    initial={"hidden"}
    whileInView={"visible"}
    viewport={{once:true,amount:0.5}}
    transition={{delay:0.4,duration:0.4}}
    variants={{
        hidden:{opacity:0,y:20},
        visible:{opacity:1,y:0}
    }} className={`${state.nightDayMode===true?"bg-[#242526]":"bg-white "} px-3  mt-4 p-3   block mx-auto md:mx-0 shadow w-full rounded-lg`}>
      <div className='flex justify-between'>
      <div className='flex gap-2'>
        <img src={postUserPfp===""?nopfp:postUserPfp} alt="" className='rounded-full mt-[4px] w-10 h-10'/>
        <div>
         <Link to={`/profile/${props.userId}`}> <p onClick={handleEmptyPosts}  className={`text-md cursor-pointer font-bold text-black/70 ${state.nightDayMode===true?"text-white":"text-black "} `}>{props.name}</p></Link>
          <p className={`'text-[12px] text-gray-500/80 font-bold ${state.nightDayMode===true?"text-[white]":"text-black "} ml-1'`}>{props.Location}</p>
        </div>
      </div>
      <BsThreeDots size={23} className={`${state.nightDayMode===true?"text-[white]":"text-black "} mt-[10px] cursor-pointer`}/>
      </div>
      <p className={`'ml-1 mt-2 pb-3 ml-4 text-[20px] font-[600] font-quicksand ${state.nightDayMode===true?"text-[white]":"text-black "} '`}>{props.caption}</p>
      {
        (postPicture.picture===""&&props.withPicture)?
        <div className={`w-full ${state.nightDayMode===true? "bg-black/25" : "bg-gray-200 bg-opacity-70"} rounded-md   h-[500px]`}>
          
<div className='pt-[38%] ' role="status">
    <svg aria-hidden="true" className="w-8 mx-auto h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
    </svg>
    <span className="sr-only">Loading...</span>
</div>

        </div>
        :
        <img src={postPicture.picture} onClick={() => {
          setLayout('center');
        }} alt="" className='rounded-md max-h-[700px] w-full object-cover cursor-pointer mb-3'/>
      }
      {
        likesnumber===0?
        <p className={`'flex text-md font-semibold ${state.nightDayMode===true?"text-[white]":"text-black "} pb-2'`}>Be the First to like this Post !</p>
        :
        <p className={`flex text-sm pb-1 ${state.nightDayMode===true?"text-[white]":"text-black "} `}><AiFillHeart className='mt-[2px] mr-[2px] text-red-500' size={19}  />{likesnumber} users Loved this post</p>

      }
      <Divider/>
      <div className='flex gap-2 justify-between my-1'>
        <div className={`w-full rounded-lg ${state.nightDayMode===true?"hover:bg-white/10":"hover:bg-gray-100 "} `}>
        <div onClick={handleAddLikes} className='flex p-1 justify-center cursor-pointer'>
        {
          postliked?
          <AiFillHeart className='mt-[2px] mr-1 text-red-500' size={25}  />
          :
          <AiOutlineHeart className={`' ${state.nightDayMode===true?"text-[white]":"text-black "} mr-1 mt-[2px]'`} size={25}  />          
        }<p className={`'ml-1 text-black/80 ${state.nightDayMode===true?"text-white":"text-black "} font-bold text-lg'`}>Love</p>
        </div>
        </div>
        <div className={` rounded-lg ${state.nightDayMode===true?"hover:bg-white/10":"hover:bg-gray-100 "} w-full`}>
        <div onClick={focusToComment} className='flex justify-center p-1 cursor-pointer'>
          <FaRegComment  className={`${state.nightDayMode===true?"text-[white]":"text-black "} mt-[2px]`} size={25}/><p className={`ml-1 ${state.nightDayMode===true?"text-white":"text-black "} text-black/80 font-bold text-lg`}>Comment</p>
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
        <img src={!state.loadingUserPfp?(state.UserPfp.length!=0?state.UserPfp:nopfp):nopfp} alt="" className='rounded-full mt-[7px] w-7 h-7'/>
        <input id={props._id} value={Makecomment} onChange={handlecomment} type="text" placeholder='Write a Comment !' className={`w-full rounded-xl h-7 ${state.nightDayMode===true?"bg-[#3a3b3c] text-white":"bg-gray-200 border border-gray-500 text-black "}  focus:border-transparent pl-3 mt-2 mx-2`}/>
        <FiSend onClick={hanldeMakeComment} size={22} color={"#04d0fa"} className='mt-[12px] cursor-pointer'/>
        </div>
        </form>
      </div>

    </motion.div>
      <Modal open={!!layout} onClose={() => setLayout(undefined)}>
            <img src={postPicture.picture}  alt="" className='rounded-md max-h-[100vh] sm:max-h-[700px] block mx-auto mt-0 sm:mt-[7%] 2xl:mt-[1%] sm:w-[700px] w-full cursor-pointer mb-3'/>
      </Modal>
    </>
  )
}
