import React from 'react';

const CartLoading = () => {
  return (
    <div className="w-full min-w-[140px] sm:max-w-[180px] md:max-w-[230px] p-4 border rounded-xl shadow-sm hover:shadow-md grid gap-4 animate-pulse bg-white">
      
      {/* Image Placeholder */}
      <div className="h-32 lg:h-40 bg-blue-50 rounded-md"></div>

      {/* Name Placeholder */}
      <div className="h-4 bg-blue-50 rounded w-3/4"></div>

      {/* Unit Placeholder */}
      <div className="h-4 bg-blue-50 rounded w-1/2"></div>

      {/* Price + Button Placeholder */}
      <div className="flex items-center justify-between gap-3">
        <div className="h-4 bg-blue-50 rounded w-16"></div>
        <div className="h-6 bg-blue-50 rounded w-14"></div>
      </div>
    </div>
  );
};

export default CartLoading;
