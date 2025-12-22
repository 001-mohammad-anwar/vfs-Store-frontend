import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  allCategory: [],
  allSubCategory: [],
  loadingCategory : false,
  product : []
};



const productSlice = createSlice({
    name: 'product',
    initialState: initialState ,
    reducers: {
        setAllCategory: (state, action) => {
           
            state.allCategory = [...action.payload];
        },
        setLoadingCategory : (state, action)=>{
            state.loadingCategory = action.payload
        },
        setSubCategory: (state, action) => {
            state.allSubCategory = [...action.payload];
        },

        setProduct: (state, action) => {
            state.product = [...action.payload];
        },
    },  
})

export const { setAllCategory, setSubCategory, setProduct, setLoadingCategory  } = productSlice.actions;
export default productSlice.reducer