import React, { useEffect } from 'react'
import CreatePost from './PostComponents/CreatePost'
import FriendsRequestsList from './FriendsRequestsList'
import UserInfo from './userInfo'
import Posts from './PostComponents/Posts'
import PostLoader from './PostComponents/PostLoader'
import { useDispatch, useSelector } from 'react-redux'
import {fetchPosts} from "./../redux/postsSlice"
export default function Mainprofile(props) {
  const loader = [1, 2];
  const dispatch=useDispatch()
  const state=useSelector((state)=>state.user.value)
  const PostsState=useSelector(state=>state.posts.value)                                    
  useEffect(() => {
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
    <UserInfo  pfp={props.pfp} UserData={state.UserData} _id={state.UserData._id} Location={state.UserData.Location} likeCount={state.UserData.likeCount} friendsListIds={state.UserData.friendsListIds} LastName={state.UserData.LastName} name={state.UserData.name} Occupation={state.UserData.Occupation}  />    
      </div>
    <div  id='userInfoComponent1'  className=' w-[350px] block mx-auto pb-5 md:mx-0 md:mt-0 mt-5 md:w-[40%]'>
    <CreatePost pfp={props.pfp}/>
    {
      !PostsState.loadingPosts
      ?(PostsState.posts.map(item=>{
        return(
          <Posts key={item._id}  withPicture={item.withPicture} comments={item.comments}  currentUser={state.UserData._id} UsersLikes={item.UsersLikes} userId={item.userId}  likes={item.likes} _id={item._id} caption={item.caption} Location={item.Location} name={item.user}/>
        )
      })):
      loader.map(item => (
        <PostLoader key={item}/>
      ))
    }
    </div>
    <div >
      <FriendsRequestsList/>
    </div>
    </div>
    </>
  )
}