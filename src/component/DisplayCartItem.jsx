import React from "react";
import { IoClose } from "react-icons/io5";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useGlobalContext } from "../provider/GlobalProvider";
import { DisplayPriceRupees } from "../utils/DisplayPriceRupees";
import { IoIosArrowForward } from "react-icons/io";
import { useSelector } from "react-redux";
import AddToCartButton from "./AddToCartButton";
import priceWithDiscount from "../utils/PriceWithDiscount";
import ImageEmptyCart from "/src/assets/images/empty-cart-.jpg";

const DisplayCartItem = ({ close }) => {
  const { notDiscountTotalPrice, totalPrice, totalQty } = useGlobalContext();
  const cartItem = useSelector((state) => state.cartItem.cart);
  const user = useSelector((state) => state.user);

  const navigate = useNavigate();
  const location = useLocation();

  const isLoginPage = location.pathname === "/login";
  const isCartDisabled = isLoginPage || cartItem.length === 0;

  const redirectCheckoutPage = () => {
    if (isCartDisabled) return;

    if (user?._id) {
      navigate("/checkout");
      close && close();
    } else {
      navigate("/login");
    }
  };

  return (
    <section
      className={`fixed inset-0 z-50 transition-all duration-300
        ${isLoginPage ? "bg-black opacity-70" : "bg-black/70"}
      `}
    >
      {/* Cart Panel */}
      <div
        className={`bg-white w-full max-w-md min-h-screen ml-auto
          transition-all duration-300
          ${isLoginPage ? "opacity-50 pointer-events-none" : ""}
        `}
      >
        {/* Header */}
        <div className="flex items-center p-4 shadow-md justify-between">
          <h2 className="font-semibold">Cart</h2>
          <button onClick={close}>
            <IoClose size={24} />
          </button>
        </div>

        {/* Body */}
        <div className="min-h-[80vh] bg-blue-50 p-2 overflow-y-auto">
          {cartItem.length > 0 ? (
            <>
              <div className="flex justify-between px-4 py-2 bg-blue-100 rounded-md mb-4">
                <p>Your Total Savings</p>
                <p className="font-semibold">
                  {DisplayPriceRupees(notDiscountTotalPrice - totalPrice)}
                </p>
              </div>

              <div className="bg-white rounded-lg p-4 space-y-4">
                {cartItem.map((item, index) => (
                  <div
                    key={index}
                    className="flex gap-4 border-b pb-4 last:border-none"
                  >
                    <div className="w-16 h-16 border rounded overflow-hidden">
                      <img
                        src={item?.productId?.image}
                        className="w-full h-full object-contain"
                        alt=""
                      />
                    </div>

                    <div className="flex-1">
                      <p className="font-semibold text-sm">
                        {item?.productId?.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {item?.productId?.unit}
                      </p>

                      <div className="flex gap-2 items-center">
                        <p className="text-green-700 font-semibold text-sm">
                          {DisplayPriceRupees(
                            priceWithDiscount(
                              item?.productId?.price,
                              item?.productId?.discount
                            )
                          )}
                        </p>

                        {item?.productId?.discount > 0 && (
                          <span className="line-through text-gray-400 text-xs">
                            {DisplayPriceRupees(item?.productId?.price)}
                          </span>
                        )}
                      </div>
                    </div>

                    <AddToCartButton data={item.productId} />
                  </div>
                ))}
              </div>

              <div className="bg-white p-4 mt-4">
                <h3 className="font-semibold mb-2">Bill details</h3>

                <div className="flex justify-between text-sm">
                  <p>Items total</p>
                  <p>
                    <span className="line-through text-gray-400 mr-2">
                      {DisplayPriceRupees(notDiscountTotalPrice)}
                    </span>
                    {DisplayPriceRupees(totalPrice)}
                  </p>
                </div>

                <div className="flex justify-between text-sm">
                  <p>Quantity</p>
                  <p>{totalQty} item</p>
                </div>

                <div className="flex justify-between font-semibold mt-2">
                  <p>Grand Total</p>
                  <p>{DisplayPriceRupees(totalPrice)}</p>
                </div>
              </div>
            </>
          ) : (
            <div className="bg-white flex flex-col items-center justify-center h-full">
              <img src={ImageEmptyCart} className="w-40" alt="" />
              <h2 className="font-semibold mt-2">Your cart is empty</h2>
              <p className="text-sm text-gray-400">
                Add items to get started
              </p>

              <Link
                to="/"
                onClick={close}
                className="mt-3 text-green-600 font-semibold"
              >
                Start Shopping
              </Link>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-2">
          <div
            onClick={redirectCheckoutPage}
            className={`px-4 py-4 flex justify-between rounded-md
              ${
                isCartDisabled
                  ? "bg-gray-400 cursor-not-allowed opacity-70"
                  : "bg-green-600 text-white cursor-pointer"
              }
            `}
          >
            <div>{DisplayPriceRupees(totalPrice)}</div>

            <button disabled={isCartDisabled} className="flex items-center gap-1">
              Proceed <IoIosArrowForward />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DisplayCartItem;
