import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';
import axios from 'axios';
import SummaryApi from "../common/SymmaryApi";
import AxiosToastError from "../utils/AxiosToastError";

const OtpVerification = () => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!location?.state?.email) {
      navigate('/forgotPassword');
    }
  }, [location?.state?.email]);

  const handleOtpChange = (e, index) => {
    const { value } = e.target;
    if (!isNaN(value) && value.length <= 1) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Automatically move to the next input
      if (value && index < otp.length - 1) {
        const nextInput = document.getElementById(`otp-input-${index + 1}`);
        if (nextInput) nextInput.focus();
      }
    }
  };

  const handleBackspace = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-input-${index - 1}`);
      if (prevInput) prevInput.focus();
    }
  };

  const isOtpComplete = otp.every((digit) => digit !== "");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isOtpComplete) {
      toast.error("Please enter the complete OTP.");
      return;
    }

    const email = location?.state?.email;
    if (!email) {
      toast.error("Email is missing!");
      navigate('/forgotPassword');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await axios({
        ...SummaryApi.otp_Verification,
        data: {
          otp: otp.join(""),
          email: email,
        },
      });

      if (response.data.error) {
        toast.error(response.data.message || "An error occurred.");
      } else if (response.data.success) {
        toast.success(response.data.message);
        setOtp(["", "", "", "", "", ""]);
        navigate("/reset-password", {
          state: { 
            email: email,
            data: response.data       
           },
        });
      }
    } catch (error) {
      setError(true);
      setIsSubmitting(false);
      AxiosToastError(error);
    }
  };

  return (
    <div className="flex items-center justify-center bg-gray-100 min-h-screen -mt-20 -mb-20">
      <div className="bg-white rounded-md shadow-lg p-8 w-full max-w-md">
        <form onSubmit={handleSubmit}>
          <p className="text-2xl font-bold text-center text-gray-800 mb-6">
            OTP Verification
          </p>

          <div className="flex justify-center gap-2 mb-6">
            {otp.map((digit, index) => (
              <input
                key={index}
                id={`otp-input-${index}`}
                type="text"
                maxLength="1"
                value={digit}
                onChange={(e) => handleOtpChange(e, index)}
                onKeyDown={(e) => handleBackspace(e, index)}
                onPaste={(e) => handlePaste(e)}
                className="w-12 h-12 text-center text-2xl font-bold border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-yellow-200"
              />
            ))}
          </div>

          <button
            type="submit"
            disabled={isSubmitting || !isOtpComplete}
            className={`w-full ${isOtpComplete ? "bg-green-800" : "bg-gray-500"} text-white p-3 rounded-md font-semibold transition duration-300`}
          >
            {isSubmitting && !error ? "Verifying..." : "Verify OTP"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default OtpVerification;
