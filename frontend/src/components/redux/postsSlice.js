import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const initialState=()=>{
    return({
        posts: [],
    })
}

export const fetchPosts=createAsyncThunk("fetchPosts",async()=>{
    const res=await axios.post(`http://localhost:9000/posts/`,{userId:"0"})
    return res.data
})
export const fetchThisUSerPosts=createAsyncThunk("fetchThisUSerPosts",async(_id)=>{
    try{
        const res=await axios.post(`http://localhost:9000/posts/`,{userId:_id})
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