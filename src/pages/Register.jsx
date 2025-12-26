import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import { IoMdEyeOff } from "react-icons/io";
import toast from 'react-hot-toast';
import  SummaryApi  from "../common/SymmaryApi";
import AxiosToastError from "../utils/AxiosToastError";
import Axios from '../utils/Axios'

const Register = () => {
  const [credential, setCredential] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const validValue = Object.values(credential).every((value) => value.trim() !== "");

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setCredential((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { email, password, confirmPassword } = credential;
  
    if (!validateEmail(email)) {
      setError("Invalid email address");
      return;
    }
  
    if (password !== confirmPassword) {
      toast.error("Password and confirm password must be the same");
      setError("Passwords do not match");
      return;
    }
  
    try {
      const response = await Axios({
         ...SummaryApi.register,
        data: credential,
      });

      if (response.data.success || response.status === 201 || response.status === 200) {
        toast.success("Registration successful! Please log in.");
        setCredential({ username: "", email: "", password: "", confirmPassword: "" });
        navigate("/login");
      }
    } catch (error) {
      AxiosToastError(error)
    }
  };
  
  return (
    <div className=" w-full flex items-center justify-center px-4">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-sm lg:max-w-md ">
        <form onSubmit={handleSubmit}>
          <h1 className="text-2xl font-bold text-center text-gray-800 mb-2">
            Welcome to BFS
          </h1>

          <div className="flex items-center justify-center pb-4">
            <span className="text-sm text-gray-700 mr-1.5">
              Already have an Account?
            </span>
            <Link className="text-blue-500 text-sm" to="/login">
              Sign In
            </Link>
          </div>

          {error && <div className="text-red-500 text-sm mb-4">{error}</div>}

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Username
            </label>
            <input
              name="username"
              value={credential.username}
              onChange={handleChangeInput}
              placeholder="Enter your username"
              type="text"
              className="bg-gray-100 border border-gray-300 rounded-md p-3 w-full text-gray-700 outline-none focus:ring-2 focus:ring-yellow-200"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              name="email"
              value={credential.email}
              onChange={handleChangeInput}
              placeholder="Enter your email"
              type="email"
              className="bg-gray-100 border border-gray-300 rounded-md p-3 w-full text-gray-700 outline-none focus:ring-2 focus:ring-yellow-200"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <div className="relative">
              <input
                name="password"
                value={credential.password}
                onChange={handleChangeInput}
                placeholder="Enter your password"
                type={showPassword ? "text" : "password"}
                className="bg-gray-100 border border-gray-300 rounded-md p-3 w-full text-gray-700 outline-none focus:ring-2 focus:ring-yellow-200 pr-10"
              />
              <div
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-3 text-gray-500 cursor-pointer hover:text-gray-700"
              >
                {showPassword ? <FaEye /> : <IoMdEyeOff />}
              </div>
            </div>
          </div>
          
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Confirm Password
            </label>
            <div className="relative">
              <input
                name="confirmPassword"
                value={credential.confirmPassword}
                onChange={handleChangeInput}
                placeholder="Re-enter your password"
                type={showConfirmPassword ? "text" : "password"}
                className="bg-gray-100 border border-gray-300 rounded-md p-3 w-full text-gray-700 outline-none focus:ring-2 focus:ring-yellow-200 pr-10"
              />
              <div
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                className="absolute right-3 top-3 text-gray-500 cursor-pointer hover:text-gray-700"
              >
                {showConfirmPassword ? <FaEye /> : <IoMdEyeOff />}
              </div>
            </div>
          </div>

          <button
            
            type="submit"
            className={`w-full ${
              validValue ? "bg-green-800" : "bg-gray-500"
            } text-white p-3 rounded-md font-semibold transition duration-300`}
            disabled={!validValue}
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
