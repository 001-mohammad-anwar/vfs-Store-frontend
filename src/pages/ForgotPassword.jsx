import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { AxiosError } from "axios";
import Axios from "axios";
import SummaryApi from "../common/SymmaryApi"
import AxiosToastError from "../utils/AxiosToastError";

const ForgotPassword = () => {
  const [data, setData] = useState({
    email: "",
  });
 
  const [error , setError] = useState("");

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const navigate = useNavigate();

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError(""); 
  };

  const validValue = Object.values(data).every(el => el);


  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email } = data;

    // Validate email
    if (!validateEmail(email)) {
        toast.error('Invalid Email');
        return;
    }

    try {
        const response = await Axios({
            method: SummaryApi.forgot_password.method,
            url: SummaryApi.forgot_password.url,
            headers: SummaryApi.forgot_password.headers,
            data: { email },
        });

       

        // Check for errors in response
        if (response.data?.error) {
            toast.error(response.data.message);
            return;
        }

        // Success handling
        if (response.data?.success) {
            toast.success(response.data.message);
            navigate("/otpVerification", {
                state: { email: data.email }, // Pass the email properly
            });
            setData({ email: "" }); // Reset the email in state
        }

    } catch (error) {
        console.log(error);
        AxiosToastError(error); // Make sure this function is correctly implemented
    }
};


  return (
    <>
      <div className="flex items-center  justify-center bg-gray-100 min-h-screen -mt-20 -mb-20">
        <div className="bg-white rounded-md shadow-lg p-8 w-full max-w-md ">
          <form onSubmit={handleSubmit}>
            <p className="text-2xl font-bold text-center text-gray-800 mb-2">
              Forgot Password
            </p>

            {/* Email Field */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                onChange={handleChangeInput}
                value={data.email}
                name="email"
                placeholder="Enter email address"
                type="text"
                className="bg-gray-100 border border-gray-300 p-3 w-full rounded-md text-gray-700 outline-none focus:ring-2 focus:ring-yellow-200"
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className={`w-full ${validValue ? "bg-green-800" : "bg-gray-500" } text-white p-3 rounded-md font-semibold  transition duration-300`}
            >
             Send OTP
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
