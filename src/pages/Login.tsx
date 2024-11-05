import React, { SyntheticEvent, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import { useAuthStore } from "../store/authStore";
import { loginApi } from "../api/auth";
import {
  showErrorToast,
  showSuccessToast,
  showWarningToast,
} from "../utils/toastUtils";
import { useLoadingBar } from "../components/LoadingBar";

type Values = {
  email: string;
  password: string;
};

const Login = () => {
  const [values, setValues] = useState<Values>({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const { login } = useAuthStore();
  const loadingBar = useLoadingBar();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const emailValidity = () => {
    const re = /\S+@\S+\.\S+/;
    const result = re.test(values.email);
    return result;
  };

  const handleSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();
    const validE = emailValidity();

    if (validE) {
      try {
        loadingBar.current?.continuousStart();

        const { token, username } = await loginApi(
          values.email,
          values.password
        );
        loadingBar.current?.complete();
        showSuccessToast("Successfully Logged In");
        login(token, username);
        setTimeout(() => navigate("/"), 1000);
      } catch (error: any) {
        loadingBar.current?.complete();
        showErrorToast(error.message);
      }
    } else {
      showWarningToast("Email id not valid");
    }
  };

  return (
    <>
      <main className="sm:h-auto sm:w-5/12 bg-bgForeground m-0 sm:my-16 sm:m-auto rounded px-20 py-16">
        <h1 className="text-4xl font-semibold text-center mb-24">Login</h1>
        <form
          className="flex flex-col align-center justify-center"
          onSubmit={handleSubmit}
        >
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={values.email}
            onChange={handleChange}
            className="w-full p-2 border rounded mb-4"
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={values.password}
            onChange={handleChange}
            className="w-full p-2 border rounded mb-4"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded"
          >
            Login
          </button>
        </form>
        <p className="text-xl text-center mt-24 hover:text-actionPrimary">
          Not registered?{" "}
          <Link to="/register" className="text-actionPrimary">
            Create an account
          </Link>
        </p>
      </main>
    </>
  );
};

export default Login;
