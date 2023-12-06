import React, { useEffect, useState } from 'react'
import CreatePost from './CreatePost'
import FriendsRequestsList from './FriendsRequestsList'
import UserInfo from './userInfo'
import Posts from './Posts'
import PostLoader from './PostLoader'
import { useDispatch, useSelector } from 'react-redux'
import {fetchPosts} from "./../redux/postsSlice"
export default function Mainprofile() {
  const loader = [1, 2];
  const dispatch=useDispatch()
  const state=useSelector((state)=>state.user.value)
  const PostsState=useSelector(state=>state.posts.value)                                    
  useEffect(() => {
    console.log(state.UserData)
    const handleFetchingPostst=()=>{
      try{
        dispatch(fetchPosts())
      }catch(err){
        console.log(err)
      }
    }
    handleFetchingPostst();
  },[state.UserData])
  useEffect(()=>{
    if(state.nightDayMode===false){
      document.body.style.backgroundColor="#f3f3f3"
     }else{
       document.body.style.backgroundColor="#18191a"
     }
  },[state.nightDayMode])
  return (
    <>
    <div className='md:flex block mx-auto  gap-16 md:justify-center mt-5 mw-28'>
      <div id="userInfoComponent">
    <UserInfo  pfp={state.UserData.pfp} UserData={state.UserData} _id={state.UserData._id} Location={state.UserData.Location} likeCount={state.UserData.likeCount} friendsListIds={state.UserData.friendsListIds} LastName={state.UserData.LastName} name={state.UserData.name} Occupation={state.UserData.Occupation}  />    
      </div>
    <div  id='userInfoComponent1'  className=' w-[350px] block mx-auto pb-5 md:mx-0 md:mt-0 mt-5 md:w-[40%]'>
    <CreatePost/>
    {
      PostsState.posts.length!==0
      ?(PostsState.posts.map(item=>{
        return(
          <Posts key={item._id} withPicture={item.withPicture} comments={item.comments}  currentUser={state.UserData._id} UsersLikes={item.UsersLikes} userId={item.userId}  likes={item.likes} _id={item._id} caption={item.caption} Location={item.Location} name={item.user}/>
        )
      })):
      loader.map(item => (
        <PostLoader key={item}/>
      ))
    }
    </div>
    <div>
      <FriendsRequestsList/>
    </div>
    </div>
    </>
  )
}