import React from "react";
import { useNavigate } from "react-router-dom";

import { useCartStore } from "../store/cartStore";

const Cart = () => {
  const { items, removeItem, updateQuantity, getTotalPrice, clearCart } =
    useCartStore();
  const navigate = useNavigate();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Shopping Cart</h1>
      {items.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <div>
          {items.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between p-4 border-b"
            >
              <img src={item.image} alt={item.title} className="w-16" />
              <span>{item.title}</span>
              <input
                type="number"
                value={item.quantity}
                onChange={(e) =>
                  updateQuantity(item.id, Number(e.target.value))
                }
                className="w-12 text-center border rounded"
              />
              <span>${(item.price * item.quantity).toFixed(2)}</span>
              <button
                onClick={() => removeItem(item.id)}
                className="text-red-500"
              >
                Remove
              </button>
            </div>
          ))}
          <div className="flex justify-between p-4 mt-4 border-t">
            <span>Total:</span>
            <span className="text-lg font-bold">
              ${getTotalPrice().toFixed(2)}
            </span>
          </div>
          <button
            onClick={() => {
              clearCart();
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
