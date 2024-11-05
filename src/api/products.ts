import axios from "axios";
import { backendUrl } from "../utils/constants";

export const fetchProducts = async () => {
  const response = await axios.get(`${backendUrl}/products`);
  return response.data;
};

export const fetchProductById = async (id: string) => {
  const response = await axios.get(`${backendUrl}/products/${id}`);
  return response.data;
};
