import { Divider } from "@mui/material";
import React, { useState } from "react";
import { AuthenticatedContext } from "../../App";
import noPfp from "./../../assets/noPfp.png";
import { FiImage } from "react-icons/fi";
import { MdOutlineKeyboardVoice, MdAttachFile } from "react-icons/md";
import { AiFillAudio } from "react-icons/ai";
import axios from "axios";
import { toast } from "react-hot-toast";
export default function CreatePost() {
  const [nightDayMode,setNightDayMode,auth, setAuth, UserData, setUserData,posts,setPosts] =React.useContext(AuthenticatedContext);
  const [loader, setLoader] = useState(false);
  const [postdata, setPostData] = useState({
    userId: UserData._id,
    user:UserData.name,
    caption: "",
    picture: "",
    userPfp:UserData.pfp,
    likes:0,
    Location:UserData.Location,
    comments:[]
  });

  const handleFileInputChange = async(event) => {
    const base64=await ConvertToBase64(event.target.files[0])
    setPostData({...postdata,picture:base64})
  };
  const handleCaption = (e) => {
    setPostData({
      ...postdata,
      caption: e.target.value
     });
  };
  // cloudinary
  
  const handleUploadClick = async() => {
    console.log(postdata.picture)
      if(postdata.caption!==""||postdata.picture.length!==0){
        setLoader(true)
         await axios.post(
          "http://localhost:9000/posts/create",
          postdata
          );
          setLoader(false)
          setPostData({...postdata,caption:"",picture:""})
          toast.success('Successfully Created Post!')
      }
      else{
        toast.error("Can't create a post without a Caption or a Picture")
      }
  };
  return (
    <div className={`${nightDayMode===true?"bg-[#242526]":"bg-white "} px-3  block mx-auto md:mx-0 shadow-sm w-full rounded-lg`}>
      <div className="flex gap-5 p-3">
        <img
          src={UserData.pfp === "" ? noPfp : UserData.pfp}
          alt=""
          className="rounded-full w-11 h-11"
        />
        <input
          type={"text"}
          placeholder="What's on your mind?"
          className={`${nightDayMode===true?"bg-[#3a3b3c] text-white":"bg-gray-200 text-black "}  pl-4 rounded-3xl w-[85%]`}
          value={postdata.caption}
          onChange={handleCaption}
        />
      </div>
      <Divider />
      <div className="mt-2 flex justify-evenly pb-3">
        <label
          htmlFor="file-upload"
          className="flex text-sm md:text-base cursor-pointer text-gray-500"
        >
          <FiImage className="mt-[5px] " /> Image
        </label>
        <input
          id="file-upload"
          onChange={handleFileInputChange}
          accept="image/*"
          className=" hidden "
          type="file"
        />
        <button className="flex cursor-pointer text-sm md:text-base text-gray-500">
          <MdOutlineKeyboardVoice className="mt-[5px]" />
          Clip
        </button>
        <button className="flex cursor-pointer text-sm md:text-base text-gray-500">
          <MdAttachFile className="mt-[5px]" />
          Attachment
        </button>
        <button className="flex cursor-pointer text-sm md:text-base text-gray-500">
          <AiFillAudio className="mt-[5px]" />
          Audio
        </button>
        {
          loader===false?
          <button
          onClick={handleUploadClick}
          className="rounded-xl text-white bg-[#04d0fa] px-3 py-[3px] text-sm "
        >
          Post
        </button>:
        <button
          className="rounded-xl text-white bg-[#04d0fa] bg-opacity-50 px-3 py-[3px] text-sm "
        >
          Posting...
        </button>
        }
      </div>
    </div>
  );
}
function ConvertToBase64(file){
  return new Promise((resolve,reject)=>{
    const fileReader=new FileReader()
    fileReader.readAsDataURL(file)
    fileReader.onload=()=>{
      resolve(fileReader.result)
    }
    fileReader.onerror=(err)=>{
      reject(err)
    }
  })
}