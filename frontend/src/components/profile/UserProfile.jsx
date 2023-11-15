import React from 'react'
import CreatePost from './../accueilComponents/CreatePost'
import FriendsRequestsList from './../accueilComponents/FriendsRequestsList'
import UserInfo from './../accueilComponents/userInfo'
import Posts from './../accueilComponents/Posts'
import Navbar from '../navbar/navbar'
import { useSelector } from 'react-redux'
export default function UserProfile() {
    const state=useSelector((state)=>state.posts.value)
    const Userstate=useSelector(state=>state.user.value)
    return (
        <>
        <Navbar/>
      <div className='md:flex block mx-auto  gap-16 md:justify-center mt-5 mw-28'>
        <div id="userInfoComponent">
      <UserInfo/>    
        </div>
      <div  id='userInfoComponent1'  className=' w-[350px] block mx-auto md:mx-0 md:mt-0 mt-5 md:w-[40%]'>
      <CreatePost/>
      {
        state.posts.length!==0
        &&(state.posts.map(item=>{
          return(
            <Posts key={item._id} comments={item.comments} picture={item.picture} currentUser={Userstate.UserData._id} UsersLikes={item.UsersLikes} userId={item.userId} pfp={item.userPfp} likes={item.likes} _id={item._id} caption={item.caption} Location={item.Location} name={item.user}/>
          )
        }))
      }
      </div>
      <div>
        <FriendsRequestsList/>
      </div>
      </div>
        </>
    )
}
