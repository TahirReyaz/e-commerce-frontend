import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import {
  CartItem,
  changeQuantity,
  getCartItems,
  removeItem,
} from "../api/orders";
import { showErrorToast, showSuccessToast } from "../utils/toastUtils";
import { useLoadingBar } from "../components/LoadingBar";
import { useAuthStore } from "../store/authStore";

const Cart = () => {
  const { isLoggedIn } = useAuthStore();

  const {
    data: cart,
    isLoading,
    error,
  } = useQuery<{ items: CartItem[]; total: number }>({
    queryKey: ["cart"],
    queryFn: () => getCartItems(),
    enabled: !!isLoggedIn,
  });
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const loadingBar = useLoadingBar();

  const handleDelete = async (id: string) => {
    try {
      loadingBar.current?.continuousStart();
      await removeItem(id);
      loadingBar.current?.complete();

      showSuccessToast("Deleted item successfully");
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    } catch (error) {
      loadingBar.current?.complete();
      showErrorToast("Error occured while deleting item");
      console.error(error);
    }
  };

  const handleQuantityChange = async (id: string, inc: boolean) => {
    try {
      loadingBar.current?.continuousStart();
      const res = await changeQuantity(id, inc);
      loadingBar.current?.complete();

      queryClient.invalidateQueries({ queryKey: ["cart"] });
      queryClient.invalidateQueries({
        queryKey: ["cart", "prodid", res.prodId],
      });
    } catch (error) {
      loadingBar.current?.complete();
      showErrorToast("Error occured while deleting item");
      console.error(error);
    }
  };

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [isLoggedIn]);

  if (isLoading) return <div className="text-center mt-20">Loading...</div>;

  if (error)
    return (
      <div className="text-center mt-20 text-red-500">Error loading cart</div>
    );

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Shopping Cart</h1>
      {cart?.items?.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <div>
          {cart?.items?.map((item) => (
            <div
              key={item._id}
              className="flex items-center justify-between p-4 border-b"
            >
              <img src={item.image} alt={item.title} className="w-16" />
              <span>{item.title}</span>
              <div className="flex items-center justify-center gap-1">
                <button onClick={() => handleQuantityChange(item._id, false)}>
                  {"<"}
                </button>
                <span className="w-12 text-center border rounded">
                  {item.quantity}
                </span>
                <button onClick={() => handleQuantityChange(item._id, true)}>
                  {">"}
                </button>
              </div>
              <span>${(item.price * item.quantity).toFixed(2)}</span>
              <button
                onClick={() => handleDelete(item._id)}
                className="text-red-500"
              >
                Remove
              </button>
            </div>
          ))}
          <div className="flex justify-between p-4 mt-4 border-t">
            <span>Total:</span>
            <span className="text-lg font-bold">${cart?.total.toFixed(2)}</span>
          </div>
          <button
            onClick={() => {
              // clearCart();
              navigate("/checkout");
            }}
            className="bg-green-600 text-white px-6 py-2 rounded mt-4"
          >
            Proceed to Checkout
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
