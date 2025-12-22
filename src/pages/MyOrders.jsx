
import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SymmaryApi";
import { Link } from "react-router-dom";
import { GlobalContext, useGlobalContext } from "../provider/GlobalProvider";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const {fetchOrders} = useGlobalContext()
  
 

   // Load orders from context function
const loadOrders = async () => {
    setLoading(true);
    try {
      const data = await fetchOrders(); // context function call
   
      setOrders(data.data.data); // set local state
    } catch (err) {
      console.error(err);
      toast.error("Failed to load orders");
    }
    setLoading(false);
  };


  // Cancel order function
const cancelOrder = async (orderId) => {
  try {
    const response = await Axios({
      ...SummaryApi.cancelOrder, // isme method & url set honi chahiye
      data: { orderId }          // body me bhejna
    });

    const { data: responseData } = response;
   

    toast.success(responseData.message);
    fetchOrders(); // refresh orders
  } catch (error) {
    console.log(error);
    toast.error(error.response?.data?.message || "Failed to cancel order");
  }
};


  useEffect(() => {
    loadOrders();
  }, []);



  return (
    <Link to={"/dashboard/order-Details"} className="max-w-4xl w-full mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">My Orders</h2>

      {loading ? (
        <p>Loading...</p>
      ) : orders.length === 0 ? (
        <p>No orders found</p>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
              
            <div
              key={order._id}
              className="border rounded-lg shadow p-4 flex justify-between items-center bg-white"
            >
              <div className="flex items-center gap-4">
                <img
                  src={order?.snapshot?.items?.[0]?.image?.[0] ||
                    "/no-image.png"}
                  alt={order.product_details?.name}
                  className="w-16 h-16 object-cover rounded"
                />
                <div>
                  <p className="font-semibold">{order.product_details?.name}</p>
                  <p className="text-sm text-gray-500">
                    Order ID: {order.orderId}
                  </p>
                  <p className="text-sm">
                    ₹{order.totalAmt} • {order.order_status || "Placed"}
                  </p>
                </div>
              </div>

              <div className="flex flex-col items-end gap-2">
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    order.order_status === "Cancelled"
                      ? "bg-red-100 text-red-600"
                      : order.order_status === "Delivered"
                      ? "bg-green-100 text-green-600"
                      : "bg-yellow-100 text-yellow-600"
                  }`}
                >
                  {order.order_status  || "Placed"}
                </span>

                {order.order_status !== "Cancelled" &&
                  order.order_status !== "Delivered" && (
                    <button
                      onClick={() => cancelOrder(order.orderId)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
                    >
                      Cancel
                    </button>
                  )}
              </div>
            </div>
          ))}
        </div>
      )}
    </Link>
  );
};

export default MyOrders;
