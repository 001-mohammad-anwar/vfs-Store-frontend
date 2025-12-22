import { createContext, useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SymmaryApi";
import { handleAddItem } from "../store/cartProductSlice";
import { handleAddAddress } from "../store/addressSlice";
import priceWithDiscount from "../utils/PriceWithDiscount";
import AxiosToastError from "../utils/AxiosToastError";
import toast from "react-hot-toast";

/* -------------------------------------------------------------------------- */
/*                            SAFE DEFAULT CONTEXT                             */
/* -------------------------------------------------------------------------- */

const defaultContextValue = {
  fetchCartItem: () => {},
  updateCartItem: () => {},
  DeleteCartItem: () => {},
  fetchAddress: () => {},
  fetchOrders: () => {},
  totalQty: 0,
  totalPrice: 0,
  notDiscountTotalPrice: 0,
};

export const GlobalContext = createContext(defaultContextValue);

/* -------------------------------------------------------------------------- */
/*                              CUSTOM HOOK                                   */
/* -------------------------------------------------------------------------- */

export const useGlobalContext = () => {
  const context = useContext(GlobalContext);
  return context || defaultContextValue;
};

/* -------------------------------------------------------------------------- */
/*                              PROVIDER                                      */
/* -------------------------------------------------------------------------- */

const GlobalProvider = ({ children }) => {
  const dispatch = useDispatch();

  const cartItem = useSelector((state) => state.cartItem.cart);
  const user = useSelector((state) => state.user);

  const [totalQty, setTotalQty] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [notDiscountTotalPrice, setNotDiscountTotalPrice] = useState(0);

  /* -------------------------------------------------------------------------- */
  /*                               CART APIs                                   */
  /* -------------------------------------------------------------------------- */

  const fetchCartItem = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.getCartItem,
      });

      const { data } = response;

      if (data?.success) {
        dispatch(handleAddItem(data.data || []));
      }
    } catch (error) {
      console.log("Fetch cart failed");
    }
  };

  const updateCartItem = async (_id, qty) => {
    try {
      const response = await Axios({
        ...SummaryApi.updateCartItemQty,
        data: { _id, quantity: qty },
      });

      if (response?.data?.success) {
        fetchCartItem();
        return response.data;
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  const DeleteCartItem = async (cartId) => {
    try {
      const response = await Axios({
        ...SummaryApi.deleteCartItem,
        data: { _id: cartId },
      });

      if (response?.data?.success) {
        toast.success(response.data.message);
        fetchCartItem();
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  /* -------------------------------------------------------------------------- */
  /*                               ADDRESS API                                 */
  /* -------------------------------------------------------------------------- */

  const fetchAddress = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.getUserAddress,
      });

      if (response?.data?.success) {
        dispatch(handleAddAddress(response.data.data));
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  /* -------------------------------------------------------------------------- */
  /*                               ORDERS API                                  */
  /* -------------------------------------------------------------------------- */

  const fetchOrders = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.getOrderDetails,
      });
      return response;
    } catch (error) {
      toast.error("Failed to fetch orders");
    }
  };

  /* -------------------------------------------------------------------------- */
  /*                       TOTAL PRICE & QTY CALCULATION                        */
  /* -------------------------------------------------------------------------- */

  useEffect(() => {
    const qty = cartItem.reduce((sum, item) => sum + item.quantity, 0);
    setTotalQty(qty);

    const discountedTotal = cartItem.reduce((sum, item) => {
      if (!item?.productId?.price) return sum;

      return (
        sum +
        priceWithDiscount(
          item.productId.price,
          item.productId.discount
        ) * item.quantity
      );
    }, 0);

    setTotalPrice(discountedTotal);

    const originalTotal = cartItem.reduce((sum, item) => {
      return sum + (item?.productId?.price || 0) * item.quantity;
    }, 0);

    setNotDiscountTotalPrice(originalTotal);
  }, [cartItem]);

  /* -------------------------------------------------------------------------- */
  /*                     USER CHANGE (LOGIN / LOGOUT)                           */
  /* -------------------------------------------------------------------------- */

  useEffect(() => {
    if (user?._id) {
      fetchCartItem();
      fetchAddress();
    } else {
      dispatch(handleAddItem([]));
      setTotalQty(0);
      setTotalPrice(0);
      setNotDiscountTotalPrice(0);
    }
  }, [user?._id]);

  /* -------------------------------------------------------------------------- */
  /*                               PROVIDER VALUE                               */
  /* -------------------------------------------------------------------------- */

  return (
    <GlobalContext.Provider
      value={{
        fetchCartItem,
        updateCartItem,
        DeleteCartItem,
        fetchAddress,
        fetchOrders,
        totalQty,
        totalPrice,
        notDiscountTotalPrice,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
