import React, { useEffect } from 'react'
import UserInfo from './../accueilComponents/userInfo'
import Posts from './../accueilComponents/Posts'
import Navbar from '../navbar/navbar'
import {fetchThisUSerPosts} from "./../redux/postsSlice"
import {fetchFindUserById} from "./../redux/user"
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
export default function UserProfile() {
    const state=useSelector((state)=>state.posts.value)
    const dispatch=useDispatch()
    const Userstate=useSelector(state=>state.user.value)
    const { userId } = useParams();
    useEffect(()=>{
      const handleFindProfile=()=>{
        try {
          if(userId!==Userstate.UserData._id){
            console.log(Userstate.profileLoading)
            dispatch(fetchFindUserById(userId))
            console.log(Userstate.profileLoading)
          }
          dispatch(fetchThisUSerPosts(userId))
        } catch (error) {
          console.error(error)
        }
      }
      handleFindProfile()
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
     <p className='text-white text-center text-[50px]'>Loading...</p> )
     :
      <UserInfo  pfp={Userstate.UserData.pfp} UserData={Userstate.UserData} _id={Userstate.UserData._id} Location={Userstate.UserData.Location} likeCount={Userstate.UserData.likeCount} friendsListIds={Userstate.UserData.friendsListIds} LastName={Userstate.UserData.LastName} name={Userstate.UserData.name} Occupation={Userstate.UserData.Occupation}  /> }
        </div>
      <div  id='userInfoComponent1'  className=' w-[350px] block mx-auto md:mx-0 md:mt-0 mt-5 md:w-[40%]'>
      {
        state.posts.length!==0
        &&(state.posts.map(item=>{
          return(
            <Posts key={item._id} comments={item.comments}  currentUser={Userstate.UserData._id} UsersLikes={item.UsersLikes} userId={item.userId}  likes={item.likes} _id={item._id} caption={item.caption} Location={item.Location} name={item.user}/>
          )
        }))
      }
      </div>
      </div>
        </>
    )
}
