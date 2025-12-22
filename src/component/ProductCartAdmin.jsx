import React, { useState } from "react";
import EditProductAdmin from "./EditProductAdmin";
import DeleteProductAdmin from "./DeleteProductAdmin";
import ConfirmBox from "./ConfirmBox";
import { IoClose } from "react-icons/io5";
import SummaryApi from "../common/SymmaryApi";
import Axios from "../utils/Axios";
import toast from "react-hot-toast";
import AxiosToastError from "../utils/AxiosToastError";

const ProductCartAdmin = ({ data, fetchProductData }) => {

  const [editOpen, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);


  const handleDeleteCancel = ()=>{
     setOpenDelete(false)
  }

  const handleDelete = async()=>{
      try {
        const response = await Axios({
          ...SummaryApi.deleteProduct,
          data : {
            _id : data._id
          }
        })
        const {data : responseData} = response
        if(responseData.success){
            toast.success(responseData.message)
            if(fetchProductData){
              fetchProductData()
            }
            setOpenDelete(false)
        }
      } catch (error) {
        AxiosToastError(error)
      }
  }

  return (
    <div className=" bg-white rounded-2xl shadow-sm border p-2 flex flex-col justify-between hover:shadow-md transition">
      {/* Product Image */}
      <div className="w-full h-full flex items-center justify-center overflow-hidden">
        <img
          src={data.image[0]}
          alt={data.name}
          className="h-full w-full object-contain rounded-lg "
        />
      </div>

      {/* Product Info */}
      <div className="mt-2">
        <p className="text-sm font-medium leading-tight line-clamp-2 h-9">
          {data?.name}
        </p>
        <p className="text-xs text-slate-500 mt-1">{data?.unit}</p>
      </div>

      {/* Add Button */}
      <div className="mt-2 flex justify-between p-1">
        {/* <p className="text-sm font-semibold mt-1">₹{data?.price}</p> */}
        <button
          onClick={() => setOpenEdit(true)}
          className="px-4 text-sm font-semibold rounded-md py-1 h-8 text-green-600  bg-green-200 hover:bg-green-100 border border-green-400"
        >
          Edit
        </button>
        <button
          onClick={() => setOpenDelete(true)}
          className="px-4 text-sm font-semibold rounded-md py-1 h-8 text-red-600  bg-red-200 hover:bg-red-100 border border-red-400"
        >
          Delete
        </button>
      </div>

      {editOpen && (
        <EditProductAdmin
          fetchProductData={fetchProductData}
          data={data}
          close={() => {
            setOpenEdit(false);
          }}
        />
      )}

      {openDelete && (
        <section className="fixed top-0 left-0 right-0 bottom-0 bg-neutral-600 z-50 bg-opacity-70 flex items-center justify-center">
          <div className="bg-white p-4 w-full max-w-md">
            <div className="flex items-center justify-between">
              <h1 className="font-semibold ">Permanent Deleted</h1>
              <button onClick={()=>setOpenDelete(false)}>
                <IoClose size={25} />
              </button>
            </div>
            <p className="my-4 ">
              Are you sure you want to permanently delete this?
            </p>
            <div className="w-fit ml-auto flex gap-2 items-center">
              <button onClick={handleDelete } className="px-3 py-1  border rounded border-green-500 hover:bg-green-500 text-green-500 hover:text-white font-medium">Confirm</button>
              <button onClick={handleDeleteCancel} className="px-3 py-1 border rounded border-red-500 hover:bg-red-500 text-red-500 hover:text-white font-medium">Cancel</button>
            </div>
          </div>
        
        </section>
      )}
    </div>
  );
};
 
export default ProductCartAdmin;
