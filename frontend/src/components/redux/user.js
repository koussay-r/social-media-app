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
    error:false
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
  }
});

export const { data,changeAuth,changeUserData,changeLoadingUSerData } = LoginDataSlice.actions;
export default LoginDataSlice.reducer;
