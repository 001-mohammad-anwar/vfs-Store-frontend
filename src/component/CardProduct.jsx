import React, { useState } from "react";
import { DisplayPriceRupees } from "../utils/DisplayPriceRupees";
import { Link } from "react-router-dom";
import { validURLConvert } from "../utils/ValidUrlConvert";
import SummaryApi from "../common/SymmaryApi";

import toast from "react-hot-toast";
import AxiosToastError from "../utils/AxiosToastError";
import Axios from "../utils/Axios";
import { useGlobalContext } from "../provider/GlobalProvider";
import AddToCartButton from "./AddToCartButton";

const CardProduct = ({ data }) => {
  const url = `/product/${validURLConvert(data.name)}-${data._id}`;
  const [loading, setLoading] = useState(false);

  return (
    <Link
      to={url}
      className="w-full max-w-[180px] sm:max-w-[220px] md:max-w-[240px] lg:max-w-[220px] xl:max-w-[200px] 2xl:max-w-[190px]  border rounded-xl shadow-sm hover:shadow-md transition-all duration-200 bg-white flex flex-col gap-2 p-3"
    >
      {/* Image */}
      <div className="w-full h-32 md:h-36 flex items-center justify-center  rounded-md overflow-hidden">
        <img
          src={data.image[0]}
          alt={data.name}
          className="max-h-32 object-contain scale-110 rounded-lg"
        />
      </div>

      {/* Delivery Time */}
      <div className="text-green-600 text-xs bg-green-100 px-2 py-[2px] rounded w-fit font-medium">
        10 min
      </div>

      {/* Name */}
      {/* <div className="w-full max-w-xs"> */}
        {/* {" "} */}
        {/* Give some width */}
        <div className="line-clamp-2 text-sm font-medium text-gray-800">
             {data.name}
        </div>
      {/* </div> */}

      {/* Unit */}
      <div className="text-xs text-gray-500">{data.unit}</div>

      {/* Price + Add Button */}
      <div className="flex gap-2 items-center justify-between mt-1">
        <div className="text-sm font-semibold text-gray-800">
          {DisplayPriceRupees(data.price)}
        </div>

        <div className="">
          {data.stock == 0 ? (
            <p className="text-red-500 text-sm text-center">Out of stock</p>
          ) : (
            <AddToCartButton data={data} />
          )}
        </div>
      </div>
    </Link>
  );
};

export default CardProduct;
