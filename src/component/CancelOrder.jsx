import React, { useState } from "react";
import axios from "axios";

const CancelOrder = ({ orderId, onCancelSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleCancel = async () => {
    if (!window.confirm("Kya aap sach me is order ko cancel karna chahte ho?")) return;

    try {
      setLoading(true);
      const { data } = await axios.put(
        `/api/orders/${orderId}/cancel`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        }
      );

      if (data.success) {
        setMessage("Order cancel ho gaya ✅");
        if (onCancelSuccess) onCancelSuccess(orderId); // parent ko update dena
      } else {
        setMessage("Order cancel nahi hua ❌");
      }
    } catch (error) {
      console.error("Cancel error:", error);
      setMessage("Kuch galat ho gaya ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 border rounded-lg bg-white shadow-sm">
      <p className="mb-2 text-gray-700">Aap is order ko cancel kar sakte ho jab tak ye dispatch nahi hua.</p>
      <button
        onClick={handleCancel}
        disabled={loading}
        className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50"
      >
        {loading ? "Cancelling..." : "Cancel Order"}
      </button>
      {message && <p className="mt-2 text-sm text-gray-600">{message}</p>}
    </div>
  );
};

export default CancelOrder;
