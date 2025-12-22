// export const baseUrl = "http://localhost:8080";
// const token = localStorage.getItem("token");

// export const baseUrl = import.meta.env.VITE_API_BASE_URL;

const SummaryApi = {
  register: {
    url: `/api/user/registration`,  
    method: "POST",

  },

  login: {
    url: `/api/user/login`,
    method: "POST",

  },

  forgot_password: {   
    url: `/api/user/forgot-password`,
    method: "PUT",
 
  },

  otp_Verification: {
    url: `/api/user/verify-forgot-password-otp`,
    method: "PUT",
 
  },
  reset_password: {
    url: `/api/user/reset-password`,
    method: "PUT",
 
  },

  refreshToken: {
    url: `/api/user/refreshToken`,
    method: "POST",
  },

 UserDetails: {
    url: `/api/user/user-details`, // Ensure full URL
    method: "GET",
  },
  logout: {
    url: `/api/user/logout`,
    method: "get", 
  },
  uploadAvatar : {
    url: `/api/user/upload-avatar`,
    method: "put",
  },
  updateUserDetails:{
     url: `/api/user/update-user`, 
     method: "put",
  },
  addCategory : {
    url : `/api/category/add-category`,
    method: "post",
  },
  uploadImage :{
    url : '/file/uploadImage',
    method : "post",

  },
  getCategories:{
    url : `/api/category/get-categories`,
    method : "get",
  },
  updateCetegory:{
    url : `/api/category/update-categories`,
    method : "put",
  },
  deleteCategory:{
    url : `/api/category/delete-category` ,
    method : "delete",
  },
  createSubCategory:{
    url : `/api/subCategory/subCategory`,
    method : "post",
  },
  getSubCategory: {
    url: "/api/subCategory/getSubCategory",
    method: "post",
  },
  updateSubCategory: {
    url: "/api/subcategory/updateCategory",
    method: "put",
  },
  deleteSubCategory:{
    url: `/api/subcategory/DeleteSubCategory`,
    method: "delete",

  },

  createProduct : {
       url : '/api/product/create-product',
       method: "post",

  },

// get  all product 
  getProduct : {
      url : "/api/product/get-product",
      method : "post",
  },

  getProductByCategory : {
      url : "/api/product/get-product-by-category",
      method : "post",
  },
  getProductByCategoryAndSubCategory : {
    url :"/api/product/get-product-by-category-and-subcategory",
    method : "post"
  },
  getProductDetails :{
    url : "/api/product/get-product-Details",
    method : "post"
  },

updateProductData :{
  url: "/api/product/update-ProductData",
  method : "put"
},
deleteProduct :{
  url: "/api/product/delete-productDetails",
  method : "delete"
},
searchProduct :{
  url: "/api/product/search-product",
  method: "post"
},

addToCart : {
    url : "/api/cart/create",
    method: "post"
},

// get all Cart Item
getCartItem : {
    url : "/api/cart/get",
    method: "get"
},

updateCartItemQty :{
  url : '/api/cart/update',
  method: "put"
},
deleteCartItem:{
  url : '/api/cart/delete-Item',
  method: "delete"
},
addUserAddress:{
   url : '/api/address/add-address',
   method : "post"
},
getUserAddress : {
  url : '/api/address/get-address',
  method : "get"
},
updateAddress : {
  url : '/api/address/update-address',
  method : "put"
},
disableAddress : {
  url : '/api/address/delete-address',
  method : "delete"
},

cashOnDelevery : {
  url : '/api/order/cash-on-delevery',
  method : "post"
},
getOrderDetails :{
  url : '/api/order/get-OrderDetails',
  method : "get"
},
cancelOrder : {
  url : "/api/order/cancel-order" ,
  method : 'put',
}



};

export default SummaryApi;
