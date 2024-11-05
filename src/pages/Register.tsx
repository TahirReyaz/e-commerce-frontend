import React, { SyntheticEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  showErrorToast,
  showSuccessToast,
  showWarningToast,
} from "../utils/toastUtils";
import { useLoadingBar } from "../components/LoadingBar";
import { registerApi } from "../api/auth";
import {
  confirmPasswordValidity,
  emailValidity,
  passwordValidity,
  usernameValidity,
} from "../utils/inputValidity";

type Values = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const Register = () => {
  const [values, setValues] = useState<Values>({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();
  const loadingBar = useLoadingBar();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();
    const validU = usernameValidity(values.username);
    const validE = emailValidity(values.email);
    const validP = passwordValidity(values.password);
    const validCP = confirmPasswordValidity(
      values.confirmPassword,
      values.password
    );

    if (validE && validP && validCP && validU) {
      try {
        loadingBar.current?.continuousStart();
        await registerApi(values.email, values.password, values.username);
        loadingBar.current?.complete();
        showSuccessToast("Registered Successfully");
        navigate("/login");
      } catch (error: any) {
        loadingBar.current?.complete();
        showErrorToast(error.message);
      }
    } else {
      let msg = "Confirm password must be same as password";
      if (!validE) {
        msg = "Email id not valid";
      } else if (!validP) {
        msg =
          "Password must have minimum length of 8 characters, contain a capital and a small letter, contain a number and a special character";
      } else if (!validU) {
        msg = "Username must not contain whitespace";
      }
      showWarningToast(msg);
    }
  };

  return (
    <>
      <main className="sm:h-auto sm:w-5/12 bg-bgForeground m-0 sm:my-16 sm:m-auto rounded px-20 py-16">
        <h1 className="text-4xl font-semibold text-center mb-24">
          Sign up to MovieList
        </h1>
        <form
          className="flex flex-col align-center justify-center"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            placeholder="Username"
            name="username"
            value={values.username}
            onChange={handleChange}
            className="w-full p-2 border rounded mb-4"
          />
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
          <input
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            value={values.confirmPassword}
            onChange={handleChange}
            className="w-full p-2 border rounded mb-4"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded"
          >
            Register
          </button>
          <div className="flex items-center justify-center my-12">
            <input type="checkbox" />
            <span className="ms-4">
              You agree to our{" "}
              <Link to="/terms" className="hover:text-actionPrimary">
                terms of service
              </Link>
            </span>
          </div>
        </form>
        <p className="text-xl text-center mt-24">
          <Link to="/login" className="hover:text-actionPrimary">
            Login
          </Link>{" "}
          ·{" "}
          <Link to="#" className="hover:text-actionPrimary">
            Resend Verification Email
          </Link>
        </p>
      </main>
    </>
  );
};

export default Register;
