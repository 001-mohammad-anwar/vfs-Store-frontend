import React, { useState } from "react";
import toast from "react-hot-toast";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { Link, Links, useNavigate } from "react-router-dom";
import SummaryApi from "../common/SymmaryApi"; 
import AxiosToastError from "../utils/AxiosToastError";
import fetchUserDetails from "../utils/fetchUserDetails";
import { useDispatch } from "react-redux";
import { setUserDetails } from "../store/userSlice";
import { useGlobalContext } from "../provider/GlobalProvider";
import Axios from "../utils/Axios";



const Login = () => {

  const {fetchCartItem} = useGlobalContext()
  const [loginCredential, setLoginCredential] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isValid = () => Object.values(loginCredential).every((el) => el);
  
  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setLoginCredential((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError(""); // Clear error on input change
  };

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };
  
const handleSubmit = async (e) => {
  e.preventDefault();

  const { email, password } = loginCredential;

  if (!validateEmail(email)) {
    setError("Invalid email format!");
    return;
  }

  try {
    // ✅ USE YOUR CUSTOM AXIOS
    const response = await Axios({
      ...SummaryApi.login,
      data: { email, password },

    });
    console.log("response from login" , response)

    if (response.data.success) {
      // ✅ SAVE TOKENS FIRST
      localStorage.setItem("accessToken", response.data.token);
      localStorage.setItem("refreshToken", response.data.refreshToken);

      // ✅ NOW FETCH USER
      // const userDetails = await fetchUserDetails();
      // console.log("userDetails",userDetails)
      // dispatch(setUserDetails(userDetails.data.data));

      // ✅ FETCH CART AFTER LOGIN
      // fetchCartItem();

      toast.success("Login successful!");
      setLoginCredential({ email: "", password: "" });

      navigate("/");
    } else {
      toast.error(response.data.message || "Login failed");
    }
  } catch (error) {
    AxiosToastError(error);
  }
};



// const handleSubmit = async (e) => {
//   e.preventDefault();

//   const { email, password } = loginCredential;

//   if (!validateEmail(email)) {
//     setError("Invalid email format!");
//     return;
//   }

//   try {
//     const response = await Axios({
//       ...SummaryApi.login,
//       data: { email, password },
//     });

//     if (response.data.success) {
//       // 1️⃣ SAVE TOKENS
//       localStorage.setItem("accessToken", response.data.token);
//       localStorage.setItem("refreshToken", response.data.refreshToken);

//       // 2️⃣ FETCH USER
//       const userDetails = await fetchUserDetails();
//       dispatch(setUserDetails(userDetails.data.data));

//       // 3️⃣ GET GUEST CART
//       const guestCart = getGuestCart();

//       // 4️⃣ MERGE GUEST CART
//       if (guestCart.length > 0) {
//         await Axios({
//           ...SummaryApi.mergeGuestCart,
//           data: { items: guestCart },
//         });

//         // 5️⃣ CLEAR GUEST CART
//         clearGuestCart();
//       }

//       // 6️⃣ FETCH USER CART
//       fetchCartItem();

//       toast.success("Login successful!");
//       navigate("/");
//     }
//   } catch (error) {
//     AxiosToastError(error);
//   }
// };


  return (
    <div className="flex  items-center justify-center min-h-[calc(100vh-168px)] lg:min-h-[calc(100vh-96px)] px-4 ">
      <div className="bg-white rounded-md shadow-lg p-8 w-full max-w-md z-50">
        <form onSubmit={handleSubmit}>
          <h1 className="text-2xl font-bold text-center text-gray-800 mb-2">Welcome to BFS</h1>

          <div className="flex items-center justify-center font-medium pb-4">
            <span className="text-2sm text-gray-700 me-1.5">Need an account?</span>
            <Link className="text-2sm link" to="/register">
              <span className="text-blue-500 text-sm">Sign up</span>
            </Link>
          </div>

          {/* Email Field */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input
              onChange={handleChangeInput}
              value={loginCredential.email}
              name="email"
              placeholder="Enter email address"
              type="text"
              className="bg-gray-100 border border-gray-300 p-3 w-full rounded-md text-gray-700 outline-none focus:ring-2 focus:ring-yellow-200"
              required
            />
          </div>

          {/* Password Field */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
            <div className="relative">
              <input
                onChange={handleChangeInput}
                value={loginCredential.password}
                name="password"
                placeholder="Enter your password"
                type={showPassword ? "text" : "password"}
                className="bg-gray-100 border border-gray-300 p-3 w-full rounded-md text-gray-700 outline-none focus:ring-2 focus:ring-yellow-200"
                required
              />
              <div
                onClick={toggleShowPassword}
                className="absolute right-3 top-3 text-gray-500 cursor-pointer hover:text-gray-700"
              >
                {showPassword ? <IoEyeOutline size={22} /> : <IoEyeOffOutline size={22} />}
              </div>
            </div>
             <div className="text-end text-blue-400 text-sm py-1">
                <Link to={"/forgotPassword"}>forgot password</Link>
             </div>
          </div>

          {/* Forgot password */}



          {/* Submit Button */}
          <button
            type="submit"
            className={`w-full ${isValid() ? "bg-green-800" : "bg-gray-500"} text-white p-3 rounded-md font-semibold transition duration-300`}
          >
            Sign In
          </button>

          {error && <p className="mt-4 text-sm text-red-500 text-center">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default Login;
