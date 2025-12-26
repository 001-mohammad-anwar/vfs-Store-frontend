import React, { useState } from "react";
import { DisplayPriceRupees } from "../utils/DisplayPriceRupees";
import { useGlobalContext } from "../provider/GlobalProvider";
import AddAdress from "../component/AddAdress";
import { useSelector } from "react-redux";
import { div } from "framer-motion/client";
import AxiosToastError from "../utils/AxiosToastError";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SymmaryApi";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { notDiscountTotalPrice, totalPrice, totalQty, fetchCartItem } = useGlobalContext();
  const [openAddress, setOpenAddress] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(0);
  const addressList = useSelector((state) => state.addresses.addressList);
  const cartItemList = useSelector((state) => state.cartItem.cart)

  const handleCashOnDelevery = async()=>{
            try {
          
              const response = await Axios({
                ...SummaryApi.cashOnDelevery,
                data : {
                    list_item : cartItemList,
                    addressId : addressList[selectedAddress]?._id ,
                    subTotalAmt : totalPrice,
                    totalAmt : totalPrice ,

                }
              })

              const {data : responseData} =  response

           
              if(responseData.success){
                  toast.success(responseData.message)
                  fetchCartItem()
              }
              navigate('/success')
              
            } catch (error) {
              console.log(error)
              AxiosToastError(error)
            }
  }

  return (
    <section className="bg-white p-4 w-full">
      <div className="container mx-auto p-4 border flex flex-col lg:flex-row w-full gap-4 justify-between">
        <div className="w-full">
          {/* Address Section */}
          <h3 className="text-lg font-semibold">Choose your address</h3>
          <div className="bg-white p-2 grid gap-4">
            {addressList.map((address, index) => {
              return (
                  <label htmlFor={"address"+index} key={"addresses"+index+"user" }>
                    <div className="border rounded p-3 flex gap-3 hover:bg-blue-50">
                        <div>
                          <input
                            id={"address"+index}
                            value={index}
                            onChange={(e) => setSelectedAddress(e.target.value)}
                            type="radio"
                            name="address"
                          />
                        </div>
                        <div>
                          <p>{address.address_line}</p>
                          <p>{address.city}</p>
                          <p>{address.state}</p>
                          <p>
                            {address.country} - {address.pincode}
                          </p>
                          <p>{address.mobile}</p>
                        </div>
                    </div>
                  </label>
              );
            })}

            <div
              onClick={() => setOpenAddress(true)}
              className="font-semibold h-16 bg-blue-50 border-2 border-dashed flex justify-center items-center cursor-pointer"
            >
              Add address
            </div>
          </div>
        </div>

        {/* Summary Section */}
        <div className="w-full lg:max-w-md  bg-white py-4 px-2 mx-auto rounded">
          {/* <div className="bg-white  p-4 w-[95%] sm:w-[80%] md:w-[70%] lg:w-[60%] xl:w-[512px] mt-8 mx-auto rounded"> */}
          <h3 className="text-lg font-semibold">Summary</h3>
          <div className="bg-blue-50 p-4">
            <h3 className="font-semibold">Bill details</h3>
            <div className="flex justify-between ml-1">
              <p>Items total</p>
              <p className="text-sm flex items-center ml-1">
                <span className="line-through mr-4 text-neutral-400">
                  {DisplayPriceRupees(notDiscountTotalPrice)}
                </span>
                <span>{DisplayPriceRupees(totalPrice)}</span>
              </p>
            </div>
            <div className="flex justify-between ml-1">
              <p>Quantity total</p>
              <p className="text-sm">{totalQty} item</p>
            </div>
            <div className="flex justify-between ml-1">
              <p>Delivery Charge</p>
              <p className="text-sm">Free</p>
            </div>
            <div className="font-semibold flex justify-between gap-4 my-2">
              <p>Grand Total</p>
              <p className="text-sm">{DisplayPriceRupees(totalPrice)}</p>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-col w-full gap-4 mt-4">
            <button
              type="button"
              className="py-2 px-4 text-white font-semibold bg-green-600 hover:bg-green-700 w-full"
            >
              Online Payment
            </button>
            <button
              onClick={handleCashOnDelevery}
              type="button"
              className="py-2 px-4 text-green-600 hover:bg-green-600 hover:text-white font-semibold border-2 border-green-600 w-full"
            >
              Cash on Delivery
            </button>
          </div>
        </div>
      </div>

      {/* Address Modal */}
      {openAddress && <AddAdress close={() => setOpenAddress(false)} />}
    </section>
  );
};

export default CheckoutPage;
