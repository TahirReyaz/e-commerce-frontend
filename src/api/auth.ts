import axios from "axios";
import { backendUrl } from "../utils/constants";

export const loginApi = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${backendUrl}/auth/login`, {
      email,
      password,
    });

    return { token: response.data.token, username: response.data.username };
  } catch (error: any) {
    const msg = error?.response?.data?.message;
    throw new Error(msg);
  }
};

export const registerApi = async (
  email: string,
  password: string,
  username: string
) => {
  try {
    await axios.post(`${backendUrl}/auth/register`, {
      email,
      password,
      username,
    });
  } catch (error: any) {
    const msg = error?.response?.data?.message;
    throw new Error(msg);
  }
};
