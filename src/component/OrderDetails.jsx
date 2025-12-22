import React from "react";
import { FaArrowLeft } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { DisplayPriceRupees } from "../utils/DisplayPriceRupees";
import priceWithDiscount from "../utils/PriceWithDiscount";

const OrderDetails = () => {
      const cartItem = useSelector((state) => state.cartItem.cart);
  return (
    <section className="p-10  w-full border">
      <div>
        <button className="p-3 border block w-fit rounded shadow-md hover:shadow-sm">
          <FaArrowLeft size={25} />
        </button>
      </div>

      <div>
        <div>
          <div className="py-8">
            <h1 className="text-2xl font-bold">Order cancelled</h1>
            <p className="text-red-500">This order has been cancelled</p>
          </div>
        <div className="bg-white rounded-lg p-4 grid gap-4">
                {cartItem[0] &&
                  cartItem.map((item, index) => {
                    return (
                      <div
                        key={index}
                        className="flex gap-4 border-b pb-4 last:border-none"
                      >
                        {/* Image */}
                        <div className="w-16 h-16 min-w-16 min-h-16 border rounded overflow-hidden bg-white shadow-sm">
                          <img
                            src={item?.productId?.image}
                            alt=""
                            className="w-full h-full object-contain"
                          />
                        </div>

                        {/* Info */}
                        <div className="flex-1">
                          <p className="text-sm font-semibold line-clamp-1 text-gray-800">
                            {item?.productId?.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            {item?.productId?.unit}
                          </p>

                          <div className="flex gap-3">
                            <p className="text-sm  text-green-700 font-semibold">
                              {DisplayPriceRupees(
                                priceWithDiscount(
                                  item?.productId?.price,
                                  item?.productId?.discount
                                )
                              )}
                            </p>

                            <div>
                              {item?.productId?.discount > 0 && (
                                <span className="line-through ml-1 text-gray-400">
                                  {DisplayPriceRupees(item?.productId?.price)}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>


                      </div>
                    );
                  })}
              </div>
        </div>
      </div>
    </section>
  );
};

export default OrderDetails;
