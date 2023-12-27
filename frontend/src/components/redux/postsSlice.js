import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const initialState=()=>{
    return({
        posts: [],
        loadingPosts: false,
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
    initialState:{
        value: initialState() 
      },
      reducers:{
        changePostsToNone:(state,action)=>{
          state.value.posts = [];
        }
      },
      extraReducers: (builder) => {
        builder.addCase(fetchPosts.pending,(state,action)=>{
          state.value.loadingPosts = true
        })
        builder.addCase(fetchThisUSerPosts.pending,(state,action)=>{
          state.value.loadingPosts = true
        })
        builder.addCase(fetchPosts.fulfilled, (state, action) => {
          state.value.posts = action.payload;
          state.value.loadingPosts = false;
        });
        builder.addCase(fetchThisUSerPosts.fulfilled, (state, action) => {
          state.value.posts = action.payload;
          state.value.loadingPosts = false;
        });
      },
})
export const {changePostsToNone}=postsSlice.actions
export default postsSlice.reducer;