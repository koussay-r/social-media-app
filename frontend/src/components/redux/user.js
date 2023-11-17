import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
// Function to get the initial state with the required dynamic logic
const nightDayMode = JSON.parse(localStorage.getItem("mode"));
const getInitialState = () => {
  const accountExistCookies = localStorage.getItem("account") === null ? false : true;
  return {
    auth: false,
    UserData: {},
    LoadingUSerData: false,
    accountExistCookies,
    error:false,
    nightDayMode:false,
    profileUser:""
  };
};
export const fetchLoginData =createAsyncThunk("fetchLoginData",async()=>{
  const accountExistCookies = localStorage.getItem("account") === null ? false : true;
  if(accountExistCookies){
    const account=JSON.parse(localStorage.getItem("account"));
    const data = await axios.post("http://localhost:9000/createUser/login",{email:account.email,password:account.password})
    console.log(data.data[0]);
  return data.data[0]}
})
export const fetchCurrentUserData = createAsyncThunk("fetchCurrentUserData",async()=>{
  try{
    const ress=await axios.post("http://localhost:9000/createUser/CurrentUser",{_id:JSON.parse(localStorage.getItem("userID"))})
    return ress.data[0];
  }catch(err){
    console.log(err.message)
  }
})

export const fetchFindUserById=createAsyncThunk("fetchFindUserById",async(itemId)=>{
  try{
    const res2=await axios.post("http://localhost:9000/Users/findUserById",{_id:itemId})
    return res2.data[0]
  }catch(Err){
    console.log(Err.message);
  }
})
export const LoginDataSlice = createSlice({
  name: "loginData",
  initialState: {
    value: getInitialState() // Use a function to get the initial state
  },
  reducers: {
    changeAuth:(state,action)=>{
      state.auth=action.payload
    },
    changeUserData:(state,action)=>{
      state.UserData=action.payload
    },
    changeLoadingUSerData:(state,action)=>{
      state.LoadingUSerData=!state.LoadingUSerData
    },
    changeAccountExistCookies:(state,action)=>{
      state.accountExistCookies=!state.accountExistCookies
    },
    changeNightDayMode:(state,action)=>{
      state.nightDayMode=action.payload
    },
    changeItem:(state,action)=>{
      state.item=action.payload
    },
    changeProfileUser:(state,action)=>{
      state.profileUser=action.payload
    }
  },
  extraReducers:(builder)=>{
    builder.addCase(fetchLoginData.pending,(state,action)=>{
      state.LoadingUSerData=true;
    });
    builder.addCase(fetchLoginData.fulfilled,(state,action)=>{
      state.LoadingUSerData=false;
      state.UserData=action.payload
      state.auth=true
    });
    builder.addCase(fetchLoginData.rejected,(state,action)=>{
      state.LoadingUSerData=false;
      state.error=true
    })
    builder.addCase(fetchCurrentUserData.fulfilled,(state,action)=>{
      state.UserData=action.payload
    })
  }
});

export const { data,changeProfileUser,changeAuth,changeUserData,changeLoadingUSerData,changeItem,changeAccountExistCookies,changeNightDayMode } = LoginDataSlice.actions;
export default LoginDataSlice.reducer;
