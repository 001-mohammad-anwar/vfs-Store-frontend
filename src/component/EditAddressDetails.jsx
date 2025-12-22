import React from "react";
import { useForm } from "react-hook-form";
import { IoClose } from "react-icons/io5";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SymmaryApi";
import AxiosToastError from "../utils/AxiosToastError";
import toast from "react-hot-toast";
import { useGlobalContext } from "../provider/GlobalProvider";

const EditAddressDetails = ({ close , data }) => {
  const { register, handleSubmit, reset } = useForm({
    defaultValues : {
          _id : data._id,
          userId : data.userId,
          address_line : data.address_line,
          city : data.city,
          state: data.state,
          pincode: data.pincode,
          country: data.country,
          mobile: data.mobile,
    }
  });
  const {fetchAddress} = useGlobalContext();

  const onSubmit = async(data)=>{ 
    try {
      const response = await Axios({
        ...SummaryApi.updateAddress,
        data : {
          ...data,
          address_line : data.address_line,
          city : data.city,
          state: data.state,
          pincode: data.pincode,
          country: data.country,
          mobile: data.mobile,
        },
      });

      const {data : responseData} = response

      if(responseData.success){
         toast.success(responseData.message)
         if(close){
            close()
            reset()
            fetchAddress()
         }
      }
    } catch (error) { 
        console.log(error)
        AxiosToastError(error)
    }
  };
  return (
    <section className="bg-black fixed top-0 left-0 right-0 bottom-0 z-50 bg-opacity-70 h-[100vh] overflow-auto">
      <div className="bg-white p-4 w-[95%] sm:w-[80%] md:w-[70%] lg:w-[60%] xl:w-[512px] mt-8 mx-auto rounded">
        <div className="flex justify-between items-center ">
          <h2 className="font-semibold">Edit Address</h2>
          <IoClose onClick={close} size={20} />
        </div>
        <form className="mt-4 grid gap-4" onSubmit={handleSubmit(onSubmit)}>

          <div className="grid gap-1 ">
            <label htmlFor="addressline">Address Line:</label>
            <input
              type="text"
              id="addressline"
              className="border p-2 rounded  bg-blue-50"
              {...register("address_line", { required: true })}
            />
          </div>
          <div className="grid gap-1 ">
            <label htmlFor="city">City:</label>
            <input
              type="text"
              id="city"
              className="border p-2 rounded  bg-blue-50"
              {...register("city", { required: true })}
            />
          </div>
          <div className="grid gap-1 ">
            <label htmlFor="state">State:</label>
            <input
              type="text"
              id="state"
              className="border p-2 rounded  bg-blue-50"
              {...register("state", { required: true })}
            />
          </div>
          <div className="grid gap-1 ">
            <label htmlFor="pincode">Pincode :</label>
            <input
              type="text"
              id="pincode"
              className="border p-2 rounded  bg-blue-50"
              {...register("pincode", { required: true })}
            />
          </div>
          <div className="grid gap-1 ">
            <label htmlFor="country">Country :</label>
            <input
              type="text"
              id="country"
              className="border p-2 rounded  bg-blue-50"
              {...register("country", { required: true })}
            />
          </div>
          <div className="grid gap-1 ">
            <label htmlFor="mobile">Mobile No :</label>
            <input
              type="text"
              id="mobile"
              className="border p-2 rounded  bg-blue-50"
              {...register("mobile", { required: true })}
            />
          </div>

          <button
            type="submit"
            className="mt-4 rounded bg-yellow-400 w-full py-2 font-semibold hover:bg-yellow-500"
          >
            Submit
          </button>
        </form>
      </div>
    </section>
  );
};




export default EditAddressDetails
