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

export const increaseQuantity = async (id: string) => {
  try {
    await apiClient.post(`${backendUrl}/cart/${id}/inc`);
  } catch (error: any) {
    const msg = error?.response?.data?.message;
    throw new Error(msg);
  }
};

export const decreaseQuantity = async (id: string) => {
  try {
    await apiClient.post(`${backendUrl}/cart/${id}/dec`);
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
    await axios.post(`${backendUrl}/cart/order`, undefined, {
      withCredentials: true,
    });
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
    await axios.get(`${backendUrl}/cart`, {
      withCredentials: true,
    });
  } catch (error: any) {
    const msg = error?.response?.data?.message;
    throw new Error(msg);
  }
};
