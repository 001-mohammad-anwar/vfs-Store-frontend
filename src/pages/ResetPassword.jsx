import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';
import AxiosToastError from "../utils/AxiosToastError";
import axios from "axios";
import SummaryApi from "../common/SymmaryApi";

const ResetPassword = () => {
  const [data, setData] = useState({
    email: "",
    newpassword: "",
    confirm_password: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();


  useEffect(() => {
       if(!(location?.state?.data?.success)){
        navigate("/");
       }

       if(location?.state?.email){
         setData((prev)=>{
               return{
                ...prev,
                email: location?.state?.email
               }
         })
       }
  },[])

  

  const handleChange = (e)=>{
     const {name , value} = e.target;
     setData((prev)=>({
        ...prev,
        [name] : value
     }))
  }

  const handleSubmit = async(e) => {
    e.preventDefault();

    if (data.newpassword !== data.confirm_password) {
      toast.error("Passwords do not match. Please try again.");
      return;
    }

    if (data.newpassword.length < 6) {
      toast.error("Password must be at least 6 characters long.");
      return;
    }
    setIsSubmitting(true);
    // API call to reset password

    try {
      const response = await axios({
         ...SummaryApi.reset_password,
         data:data
      })

      if(response.data.error){
           toast.error(response.data.message);
      }

      if(response.data.success){
          toast.success(response.data.message);
          // setIsSubmitting(false);
          navigate("/login");
          setData({
            email: "",
            newpassword: "",
            confirm_password: "",
          }) 
      }

    } catch (error) {
      AxiosToastError(error);
    }
  };

  return (
    <div className="flex items-center justify-center bg-gray-100 min-h-screen">
      <div className="bg-white rounded-md shadow-lg p-8 w-full max-w-md">
        <form onSubmit={handleSubmit}>
          <p className="text-2xl font-bold text-center text-gray-800 mb-6">
            Reset Password
          </p>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              New Password
            </label>
            <input
              type="password"
              name="newpassword"
              value={data.newpassword}
              onChange={handleChange}
              placeholder="Enter new password"
              className="bg-gray-100 border border-gray-300 p-3 w-full rounded-md text-gray-700 outline-none focus:ring-2 focus:ring-yellow-200"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirm_password"
              value={data.confirm_password}
              onChange={handleChange}
              placeholder="Confirm your password"
              className="bg-gray-100 border border-gray-300 p-3 w-full rounded-md text-gray-700 outline-none focus:ring-2 focus:ring-yellow-200"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full ${
              isSubmitting ? "bg-gray-500" : "bg-green-800"
            } text-white p-3 rounded-md font-semibold transition duration-300`}
          >
            {isSubmitting ? "Resetting..." : "Reset Password"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
