import React, { useEffect, useState } from "react";
import { placeOrder } from "../api/orders";
import { showErrorToast, showSuccessToast } from "../utils/toastUtils";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { useLoadingBar } from "../components/LoadingBar";

const Checkout = () => {
  const navigate = useNavigate();
  const { token } = useAuthStore();
  const loadingBar = useLoadingBar();

  const handleCheckout = async () => {
    try {
      loadingBar.current?.continuousStart();
      await placeOrder();
      loadingBar.current?.complete();

      showSuccessToast("Order placed! Our staff will contact you soon.");
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (error) {
      loadingBar.current?.complete();
      showErrorToast(
        "Error occurred while processing payment! Please react out to our help desk for refund."
      );
    }
  };

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token]);

  return (
    <div className="container mx-auto px-4 py-8 max-w-[400px]">
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
    </div>
  );
};

export default Checkout;
