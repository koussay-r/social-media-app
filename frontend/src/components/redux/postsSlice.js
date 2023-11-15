import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { useSelector } from 'react-redux'
const state=useSelector(state.user.value)
import axios from "axios";
import { useSelector } from "react-redux";
const initialState=()=>{
    return({
        posts: [],
    })
}

export const fetchPosts=createAsyncThunk("fetchPosts",async()=>{
    const res=await axios.post(`http://localhost:9000/posts/`,{userId:"0"})
    return res.data
})
export const fetchThisUSerPosts=createAsyncThunk("fetchThisUSerPosts",async()=>{
    try{
        const res=await axios.post(`http://localhost:9000/posts/`,{userId:state.item._id})
        return res.data
    }catch(err){
        console.log(err.message)
    }
})
export const postsSlice=createSlice({
    name:"postsSlice",
    initialState:initialState,
    extraReducers:(builder)=>{
        builder.addCase(fetchPosts.fulfilled,(state,action)=>{
            state.posts=action.payload;
        })
        builder.addCase(fetchThisUSerPosts.fulfilled,(state,action)=>{
            state.posts=action.payload
        })
    }
})
export default fetchPosts.reducer;