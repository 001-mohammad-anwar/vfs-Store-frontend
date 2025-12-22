import React from 'react'
import { validURLConvert } from '../utils/ValidUrlConvert';
import { Link } from 'react-router-dom';
import { DisplayPriceRupees } from '../utils/DisplayPriceRupees';

const CardProductListPage = ({data}) => {
    const url = `/product/${validURLConvert(data.name)}-${data._id}`
    return (
        <Link
        to={url}
        className="w-full max-w-[180px] sm:max-w-[220px] md:max-w-[240px] lg:max-w-[220px] xl:max-w-[200px] 2xl:max-w-[190px] mx-auto border rounded-xl shadow-sm hover:shadow-md transition-all duration-200 bg-white flex flex-col gap-2 p-3"
      >
        {/* Image */}
        <div className={`relative w-full h-20 md:h-32 flex items-center justify-center rounded-md overflow-hidden ${data.stock == 0 ? "opacity-40" : ""}`}>
          <img
            src={data.image[0]}
            alt={data.name}
            className="max-h-32 object-contain scale-110 rounded-lg"
          /> 

        </div>
          {
            data.stock == 0 && (
              <div className='absolute top-20 left-16 text-xs bg-gray-500 text-white w-fit rounded-md px-2 py-[1px] flex items-center justify-center'>
                 <p>out of Stock</p>
              </div>
            )
          }
      
        {/* Delivery Time */}
        <div className="text-green-600 text-xs bg-green-100 px-2 py-[2px] rounded w-fit font-medium">
          10 min
        </div>
      
        {/* Name */}
        <div className="text-sm font-medium line-clamp-2 leading-tight text-gray-800">
          {data.name}
        </div>
      
        {/* Unit */}
        <div className="text-xs text-gray-500">{data.unit}</div>
      
        {/* Price + Add Button */}
        <div className="flex items-center justify-between mt-1">
          <div className="text-sm font-semibold text-gray-800">
            {DisplayPriceRupees(data.price)}
          </div>
          <button className="text-xs font-semibold px-3 py-1 border border-green-600 bg-green-50 text-green-700 rounded hover:bg-green-100 transition-all">
            Add
          </button>
        </div>
      </Link>
      
    );
}

export default CardProductListPage
