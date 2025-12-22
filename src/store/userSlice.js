import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    _id : "",
    username : "",
    email : "",
    avatar : "",
    mobile : "",
    verify_email : "",
    last_login_date : "",
    status : "",
    address_details : [],
    role : "", 
    shopping_cart :[],
    orderHistory: [],
}

export const userSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {
       setUserDetails: (state , action) =>{
          state._id = action.payload?._id
          state.username = action.payload?.username;
          state.email = action.payload?.email;
          state.avatar = action.payload?.avatar;
          state.mobile = action.payload?.mobile ;
          state.verify_email = action.payload?.verify_email ;
          state.last_login_date = action.payload?.last_login_date ;
          state.status = action.payload?.status ;
          state.shopping_cart = action.payload?.shopping_cart 
          state.address_details = action.payload?.address_details ;
          state.orderHistory = action.payload?.orderHistory;
          state.role = action.payload?.role ;
       },
       
       updateUserAvatar: (state, action)=>{
        state.avatar = action.payload;
       },

       logout: (state , action) => {
        state._id = ""
        state.username = ""
        state.email = ""
        state.avatar = ""
        state.mobile = ""
        state.verify_email = ""
        state.last_login_date = ""
        state.status = ""
        state.shoping_cart = []
        state.address_details = []
        state.orderHistory = []
        state.role = "" 
       }
    }
})

export const {setUserDetails,updateUserAvatar, logout}  = userSlice.actions

export default userSlice.reducer