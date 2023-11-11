import { createSlice } from "@reduxjs/toolkit";

// Function to get the initial state with the required dynamic logic
const getInitialState = () => {
  const nightDayMode = JSON.parse(localStorage.getItem("mode"));
  const accountExistCookies = localStorage.getItem("account") === null ? false : true;

  return {
    auth: false,
    UserData: {},
    emailRecoverPassword: "",
    posts:[],
    LoadingUSerData: false,
    nightDayMode,
    accountExistCookies,
    profileUser: "",
    recoveryCode: 0
  };
};

export const userSlice = createSlice({
  name: "user",
  initialState: {
    value: getInitialState() // Use a function to get the initial state
  },
  reducers: {
    data: (state, action) => {
      state.value = action.payload;
    },
  }
});

export const { data,code } = userSlice.actions;
export default userSlice.reducer;
