import React, { useState } from "react";
import axios from "axios";

const Checkout = () => {
  const [message, setMessage] = useState<string | null>(null);

  const handleCheckout = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/checkout");
      setMessage(response.data.message);
    } catch (error) {
      setMessage("Error processing payment");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Checkout</h1>
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Name"
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Address"
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Credit Card Number"
          className="w-full p-2 border rounded"
        />
      </div>
      <button
        onClick={handleCheckout}
        className="mt-4 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
      >
        Place Order
      </button>
      {message && (
        <div className="mt-4 text-center font-semibold">{message}</div>
      )}
    </div>
  );
};

export default Checkout;
