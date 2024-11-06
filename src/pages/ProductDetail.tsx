import React from "react";
import { useParams } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import { fetchProductById } from "../api/products";
import {
  CartItem,
  createItem,
  decreaseQuantity,
  getCartItemByProductId,
  increaseQuantity,
} from "../api/orders";

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const queryClient = useQueryClient();

  const {
    data: prodData,
    error: prodError,
    isLoading: isProdLoading,
  } = useQuery({
    queryKey: ["product", id],
    queryFn: () => fetchProductById(id!),
  });

  const {
    data: cartData,
    error: cartError,
    isLoading: isCartLoading,
  } = useQuery<CartItem>({
    queryKey: ["cart", "prod", id],
    queryFn: () => getCartItemByProductId(id!),
  });

  const handleClick = async (inc: boolean) => {
    if (inc) {
      if (cartData) {
        await increaseQuantity(cartData._id);
      } else {
        await createItem({ ...prodData, prodId: prodData.id });
        queryClient.invalidateQueries({ queryKey: ["cart", "prod", id] });
      }
    } else {
      await decreaseQuantity(cartData?._id ?? "");
    }
  };

  if (isProdLoading) return <div className="text-center mt-20">Loading...</div>;
  if (prodError)
    return (
      <div className="text-center mt-20 text-red-500">
        Error loading product
      </div>
    );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        <img
          src={prodData.image}
          alt={prodData.title}
          className="w-full md:w-1/2 object-cover rounded-lg"
        />
        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-4">{prodData.title}</h1>
          <p className="text-gray-700 mb-4">${prodData.price}</p>
          <p className="text-gray-600 mb-6">{prodData.description}</p>
          <button
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
            onClick={() => handleClick(true)}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
