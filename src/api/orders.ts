import axios from "axios";

import { backendUrl } from "../utils/constants";
import apiClient from ".";

export interface CartItem {
  _id: string;
  title: string;
  price: number;
  quantity: number;
  image: string;
  prodId: string;
}

export const changeQuantity = async (id: string, inc: boolean) => {
  try {
    const res = await apiClient.post(
      `${backendUrl}/cart/${id}/update-quantity`,
      { inc }
    );
    return res.data;
  } catch (error: any) {
    const msg = error?.response?.data?.message;
    throw new Error(msg);
  }
};

export const createItem = async ({
  title,
  price,
  image,
  prodId,
}: Partial<CartItem>) => {
  try {
    await apiClient.post(`${backendUrl}/cart`, {
      title,
      price,
      image,
      prodId,
    });
  } catch (error: any) {
    const msg = error?.response?.data?.message;
    throw new Error(msg);
  }
};

export const placeOrder = async () => {
  try {
    await apiClient.post("/cart/checkout");
  } catch (error: any) {
    const msg = error?.response?.data?.message;
    throw new Error(msg);
  }
};

export const getCartItemByProductId = async (id: string) => {
  try {
    const res = await apiClient.get(`${backendUrl}/cart/prodid/${id}`);
    return res.data;
  } catch (error: any) {
    const msg = error?.response?.data?.message;
    throw new Error(msg);
  }
};

export const getCartItems = async () => {
  try {
    const res = await apiClient.get(`${backendUrl}/cart`);
    const totalPrice = res.data.reduce(
      (total: number, item: CartItem) => total + item.quantity,
      0
    );
    console.log(res.data, { totalPrice });
    return { items: res.data, total: totalPrice };
  } catch (error: any) {
    const msg = error?.response?.data?.message;
    throw new Error(msg);
  }
};

export const removeItem = async (id: string) => {
  try {
    const res = await apiClient.delete(`${backendUrl}/cart/${id}`);
    return res.data;
  } catch (error: any) {
    const msg = error?.response?.data?.message;
    throw new Error(msg);
  }
};
