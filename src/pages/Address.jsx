import React, { useState } from "react";
import { useSelector } from "react-redux";
import AddAdress from "../component/AddAdress";
import { BsThreeDotsVertical } from "react-icons/bs";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import EditAddressDetails from "../component/EditAddressDetails";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SymmaryApi";
import toast from "react-hot-toast";
import AxiosToastError from "../utils/AxiosToastError";
import { useGlobalContext } from "../provider/GlobalProvider";

const Address = () => {
  const addressList = useSelector((state) => state.addresses.addressList);
  const [openAddress, setOpenAddress] = useState(false);
  const [openEditIndex, setOpenEditIndex] = useState(null);
  const [openEdit , setOpenEdit] = useState(false)
  const [editData , setEditData] = useState({})
  const {fetchAddress} = useGlobalContext()
   
const handleDisableAddress = async(id)=>{
   try {
      const response = await Axios({
           ...SummaryApi.disableAddress,
           data : {
            _id : id
           }
      })

      if(response.data.success){
        toast.success("Address Remove")
        if(fetchAddress){
          fetchAddress()
        }
      }
   } catch (error) {
    console.log(error)
     AxiosToastError(error)
   }
}

  return (
    <div className="w-full">
      <div className="bg-white px-4 py-3 shadow-md flex justify-between gap-4">
        <h2 className="font-bold mt-lg text-ellipsis line-clamp-1">Address</h2>
        <button
          onClick={() => setOpenAddress(true)}
          className="border border-yellow-400 text-yellow-400 px-4 py-1 rounded-full text-center hover:bg-yellow-400 hover:text-white font-semibold"
        >
          Add Address
        </button>
      </div>
      <div className="bg-blue-50 p-2 grid gap-4">
        {addressList.map((address, index) => {
          return (
            <div
              key={"addresses" + index + "user"}
              className={`border rounded p-3 flex gap-3 bg-white justify-between ${ !address.status && 'hidden'  }`}
            >
              <div>
                <p>{address.address_line}</p>
                <p>{address.city}</p>
                <p>{address.state}</p>
                <p>
                  {address.country} - {address.pincode}
                </p>
                <p>{address.mobile}</p>
              </div>

              <div className="py-2 px-4 flex gap-1">
                {openEditIndex === index && (
                  <div className="flex flex-col gap-1">
                
                      <button onClick={()=>{
                        setOpenEdit(true)
                        setEditData(address)

                      }} className="shadow-md  text-sm px-6 py-2 text-green-600 flex gap-1 hover:shadow-lg">
                       <MdEdit size={20}/> Edit
                      </button>
                       


                    <button onClick={()=>{handleDisableAddress(address._id)}} className="shadow-md border-t-1 text-sm px-6 py-2  text-red-600 flex items-center gap-1 hover:shadow-lg">
                      <MdDelete size={20}/> Delete
                    </button>
                  </div>
                )}
                <div onClick={ ()=>setOpenEditIndex(openEditIndex === index ? null : index)}>
                  <BsThreeDotsVertical size={20} />
                </div>
              </div>
            </div>
          );
        })}

        <div
          onClick={() => setOpenAddress(true)}
          className="font-semibold bg-white h-16 text-green-600  border-2 border-dashed flex justify-center items-center cursor-pointer"
        >
          Add address
        </div>
      </div>

      {openAddress && <AddAdress close={() => setOpenAddress(false)} />}
      {openEdit && <EditAddressDetails close = {()=>setOpenEdit(false)} data = {editData}/>}  
    </div>
  );
};

export default Address;
