import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./component/header/Navbar";
import toast, { Toaster } from "react-hot-toast";
import Footer from "./component/footerSection/Footer";
import fetchUserDetails from "./utils/fetchUserDetails";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUserDetails } from "./store/userSlice";
import {
  setAllCategory,
  setLoadingCategory,
  setSubCategory,
} from "./store/productSlice";
import Axios from "./utils/Axios";
import SummaryApi from "./common/SymmaryApi";
import GlobalProvider, { GlobalContext } from "./provider/GlobalProvider";
import { FaShoppingCart } from "react-icons/fa";
import CartMobile from "./component/CartMobile";
// import { useGlobalContext } from "./provider/GlobalProvider";

function App() {
  // const { fetchCartItem } = useGlobalContext()
  const dispatch = useDispatch();
  const location = useLocation()


const fetchUser = async () => {
  try {
    const userData = await fetchUserDetails();
    

    if (userData?.data?.data) {
      dispatch(setUserDetails(userData.data.data));
    } else {
      dispatch(setUserDetails(null));
    }
  } catch (error) {
    console.log("fetchUser failed:", error);
    dispatch(setUserDetails(null));
  }
};


  const fetchCategory = async () => {
    try {
      dispatch(setLoadingCategory(true));
      const response = await Axios({
        ...SummaryApi.getCategories,
      });
      const { data: responseData } = response;

      if (responseData.success) {
        dispatch(setAllCategory(responseData.data));
      }
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(setLoadingCategory(false));
    }
  };
  const fetchSubCategory = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.getSubCategory,
      });
      const { data: responseData } = response;

      if (responseData.success) {
        dispatch(setSubCategory(responseData.data.subcategories));
      }
    } catch (error) {
      console.log(error);
    }
  };

 useEffect(() => {
  const token = localStorage.getItem("accessToken");

  if (token) {
    fetchUser();
  }
  fetchCategory();
  fetchSubCategory();
}, []);



  // console.log("location",location.pathname === '/checkout')

  // useEffect(() => {
  //   const fetchUserData = async () => {
  //     try {
  //       const UserData = await fetchUserDetails();
  //       if (UserData && UserData.data && UserData.data.data) {

  //       } else {
  //         console.error("Invalid user data:", UserData);
  //       }
  //     } catch (error) {
  //       console.error("Error fetching user details:", error);
  //     }
  //   };

  //   fetchUserData();
  //   fetchCategory();
  // }, []); // Added dispatch in dependency array

  //   const fetchCategory = async () => {
  //   try {

  //     const response = await Axios({ ...SummaryApi.getCategories });
  //     const { data: responseData } = response;

  //     if (responseData) {
  //       // setCategories(responseData.data);
  //       dispatch(setAllCategory(responseData.data));
  //     }
  //   } catch (error) {
  //     console.error("Error fetching categories:", error);
  //   } finally {

  //   }
  // };

  return (
    <GlobalProvider>
  
        <Navbar />
        <main className=" min-h-[80vh] ">
          <Outlet />
        </main>
        <Footer />
        <Toaster />

        {
          location.pathname !== '/checkout' && (
               <CartMobile />
          )
        }
          
      
    
    </GlobalProvider>
  );
}

export default App;
