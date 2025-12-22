import React from "react";
import { useGlobalContext } from "../provider/GlobalProvider";
import { FaShoppingCart } from "react-icons/fa";
import { DisplayPriceRupees } from "../utils/DisplayPriceRupees";
import { IoMdArrowDropright } from "react-icons/io";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const CartMobile = () => {
  const { totalQty, totalPrice } = useGlobalContext();
  const cartItem = useSelector((state) => state.cartItem.cart);
  return (
    <>
      {cartItem[0] && (
        <div className="sticky bottom-4 p-2 container mx-auto">
          <div className="bg-green-600 px-2 p-1 rounded-lg lg:hidden text-neutral-100 flex justify-between">
            <div className="flex gap-2 items-center">
              <div className="">
                <FaShoppingCart size={30} />
              </div>
              <div className="text-xs">
                <p>{totalQty} items</p>
                <p>{DisplayPriceRupees(totalPrice)}</p>
              </div>
            </div>
            <Link
              to={"/cart"}
              className="flex items-center cursor-pointer gap-1 p-2"
            >
              <span className="text-sm">View Cart</span>
              <div className="flex items-center pt-1">
                <IoMdArrowDropright size={30} />
              </div>
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default CartMobile;
