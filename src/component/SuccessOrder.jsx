import React from "react";
import { Link } from "react-router-dom";

const SuccessOrder = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center h-[80vh] bg-gray-50 px-4">
      {/* Green Check Icon */}
      <div className="bg-green-100 p-6 rounded-full">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-16 w-16 text-green-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        > 
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </div>

      {/* Success Text */}
      <h1 className="text-2xl font-bold text-green-700 mt-6">
        Order Placed Successfully! 🎉
      </h1>
      <p className="text-gray-600 mt-2 text-center">
        Thank you for shopping with us. Your order has been confirmed and will
        be dispatched soon.
      </p>

      {/* Buttons */}
      <div className="mt-6 flex gap-4">
        <Link
          to="/"
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition"
        >
          Back to Home
        </Link>
        <Link
          to="/dashboard/myOrders"
          className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-2 rounded-lg transition"
        >
          View My Orders
        </Link>
      </div>
    </div>
  );
};

export default SuccessOrder;

