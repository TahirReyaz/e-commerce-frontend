import { toast, Bounce, ToastOptions } from "react-toastify";

const defaultOptions: ToastOptions = {
  position: "top-center",
  autoClose: 1000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "light",
  transition: Bounce,
};

export const showToast = (message: string, options: ToastOptions = {}) => {
  toast(message, { ...defaultOptions, ...options });
};

export const showSuccessToast = (
  message: string,
  options: ToastOptions = {}
) => {
  toast.success(message, { ...defaultOptions, ...options });
};

export const showErrorToast = (message: string, options: ToastOptions = {}) => {
  toast.error(message, { ...defaultOptions, ...options });
};

export const showWarningToast = (
  message: string,
  options: ToastOptions = {}
) => {
  toast.warning(message, { ...defaultOptions, ...options });
};
