import React, { useEffect } from 'react'
import UserInfo from './../accueilComponents/userInfo'
import Posts from './../accueilComponents/Posts'
import Navbar from '../navbar/navbar'
import UserinfoLoader from "./../accueilComponents/UserinfLoader"
import {fetchThisUSerPosts} from "./../redux/postsSlice"
import {fetchFindUserById} from "./../redux/user"
import { useDispatch, useSelector } from 'react-redux'
import {  useParams } from 'react-router-dom'
import {fetchGetUserPfp,LoadUserPfp} from "./../redux/user"
import PostLoader from '../accueilComponents/PostLoader'
export default function UserProfile() {
    const state=useSelector((state)=>state.posts.value)
    const dispatch=useDispatch()
    const Userstate=useSelector(state=>state.user.value)
    const { userId } = useParams();
    useEffect(()=>{
      if(state.nightDayMode){
        document.body.style.backgroundColor="#f3f3f3"
       }else{
         document.body.style.backgroundColor="#18191a"
       }
      const handleFindProfile=()=>{
        try {
          if(userId!==Userstate.UserData._id){
            dispatch(fetchFindUserById(userId))
          }
          dispatch(fetchThisUSerPosts(userId))
        } catch (error) {
          console.error(error)
        }
      }
      handleFindProfile()
    },[state.nightDayMode])
    useEffect(()=>{
        const profilePicCookiesExsit=sessionStorage.getItem("profilePic") === null ? false : true;
        console.log(profilePicCookiesExsit)
        if(!profilePicCookiesExsit){
          dispatch(fetchGetUserPfp(userId))
        }
        else{
          dispatch(LoadUserPfp(sessionStorage.getItem("profilePic")))
        }
      
  },[])
    return (
        <>
        <Navbar/>
      <div className='md:flex block mx-auto  gap-16 md:justify-center mt-5 mw-28'>
        <div id="userInfoComponent">
     { userId!==Userstate.UserData._id?
     (!Userstate.profileLoading?
     <UserInfo  pfp={Userstate.profileUser.pfp} UserData={Userstate.profileUser} _id={Userstate.profileUser._id} Location={Userstate.profileUser.Location} likeCount={Userstate.profileUser.likeCount} friendsListIds={Userstate.profileUser.friendsListIds} LastName={Userstate.profileUser.LastName} name={Userstate.profileUser.name} Occupation={Userstate.profileUser.Occupation}/>    
     :
     <UserinfoLoader/> )
     :
      <UserInfo  pfp={Userstate.UserData.pfp} UserData={Userstate.UserData} _id={Userstate.UserData._id} Location={Userstate.UserData.Location} likeCount={Userstate.UserData.likeCount} friendsListIds={Userstate.UserData.friendsListIds} LastName={Userstate.UserData.LastName} name={Userstate.UserData.name} Occupation={Userstate.UserData.Occupation}  /> }
        </div>
      <div  id='userInfoComponent1'  className=' w-[350px] block mx-auto md:mx-0 md:mt-12  md:w-[40%]'>
      {
        state.posts.length!==0
        ?(state.posts.map(item=>{
          return(
            <Posts key={item._id} withPicture={item.withPicture} comments={item.comments}  currentUser={Userstate.UserData._id} UsersLikes={item.UsersLikes} userId={item.userId}  likes={item.likes} _id={item._id} caption={item.caption} Location={item.Location} name={item.user}/>
          )
        })):
        <PostLoader/>
      }
      </div>
      </div>
        </>
    )
}
