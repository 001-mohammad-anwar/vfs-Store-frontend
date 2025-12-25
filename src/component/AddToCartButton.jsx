import React, { useEffect, useState } from "react";
import { useGlobalContext } from "../provider/GlobalProvider";
import SummaryApi from "../common/SymmaryApi";
import toast from "react-hot-toast";
import AxiosToastError from "../utils/AxiosToastError";
import Loading from "./Loading";
import { useSelector } from "react-redux";
import { FaPlus } from "react-icons/fa6";
import { FaMinus } from "react-icons/fa6";
import Axios from "../utils/Axios";

  const AddToCartButton = ({ data }) => {
  const { fetchCartItem, updateCartItem, DeleteCartItem } = useGlobalContext();
  const [loading, setLoading] = useState(false);
  const cartItem = useSelector((state) => state.cartItem.cart);
  const [isAvailableCart, setIsAvailableCart] = useState(false);
  const [qty, setQty] = useState(0);
  const [cartItemDetails, setCartItemDetails] = useState();
  const handleAddToCart = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      setLoading(true);
      const response = await Axios({
        ...SummaryApi.addToCart,
        data: { productId: data._id },
      });
      
      const { data: responseData } = response;
      if (responseData.success) {
        toast.success(responseData.message);
        fetchCartItem();
      }
    } catch (error) {
      console.log(error);
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const product = cartItem.find((item) => item.productId._id === data._id);
    setIsAvailableCart(product);
    setQty(product?.quantity || 0);
    setCartItemDetails(product);
  }, [data, cartItem]);

  const increaseQty = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    const response = await updateCartItem(cartItemDetails._id, qty + 1);
    if (response.success) {
      toast.success("Item Added");
    }
  };

  const decreaseQty = async(e) => {
    e.preventDefault();
    e.stopPropagation();

    if (qty === 1) {
      DeleteCartItem(cartItemDetails?._id);
    } else {

    const response = await updateCartItem(cartItemDetails?._id, qty - 1);

      if (response.success) {
        toast.success("Item remove");
      }
    }
  };

  return (
    <div>
      {isAvailableCart ? (
        <div className="w-full max-w-[150px] flex justify-center items-center">
          <button
            onClick={decreaseQty}
            className="bg-green-600 hover:bg-green-700 text-white rounded py-2 px-3 w-full flex-1"
          >
            <FaMinus />
          </button>
          <p className="font-semibold w-full flex-1 py-2 px-2">{qty}</p>
          <button
            onClick={increaseQty}
            className="bg-green-600 hover:bg-green-700 text-white rounded py-2 px-3 w-full flex-1"
          >
            <FaPlus />
          </button>
        </div>
      ) : (
        <button
          onClick={handleAddToCart}
          className="text-xs font-semibold py-2 px-6 border border-green-600 bg-green-50 text-green-700 rounded hover:bg-green-100 transition-all"
        >
          {loading ? <Loading /> : "Add"}
        </button>
      )}
    </div>
  );
};

export default AddToCartButton;
