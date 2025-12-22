import { createSlice } from "@reduxjs/toolkit";
import { address } from "framer-motion/client";

const initialValue = {
    addressList : []
}

const addressSlice = createSlice({
   name : "address",
   initialState : initialValue,
   reducers : {
       handleAddAddress : (state , action) => {
            state.addressList = [...action.payload]
       } 
   }
})

export const { handleAddAddress  } = addressSlice.actions;
export default addressSlice.reducer