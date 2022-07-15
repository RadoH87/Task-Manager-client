import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ApiConstants } from "../api/ApiConstants";
import custom_axios from "../axios/AxiosSetup";
import { toast } from "react-toastify";

export const SignUp = () => {
  const navigate = useNavigate();
  const firstName: any = React.useRef();
  const lastName: any = React.useRef();
  const password: any = React.useRef();
  const confirmPassword: any = React.useRef();
  const email: any = React.useRef();

  const register = async () => {
    if (password.current.value !== confirmPassword.current.value) {
      toast.info("Password does not match!!!");
      return;
    }
    if (!password.current.value || password.current.value.length < 8) {
      toast.info("Password must be at least 8 characters");
      return;
    }
    if (!email.current.value) {
      toast.info("Please provide your email");
      return;
    }

    const response = await custom_axios.post(ApiConstants.USER.SIGN_UP, {
      firstName: firstName.current.value,
      lastName: lastName.current.value,
      email: email.current.value,
      password: password.current.value,
    });
    console.log(response.data);
    toast.success("Account Created Successfully!!!");
    navigate("/login");
  };

  return (
    <section className="min-w-screen min-h-screen bg-gray-900 flex items-center justify-center px-5 py-5">
      <div className="container mx-auto px-6 py-12 h-full text-xl text-white overflow-hidden">
        <div className="flex justify-center items-center flex-wrap h-full">
          <div className="hidden md:block w-1/2 py-10 px-10">
            <img
              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
              className="img-fluid"
              alt="Sample image"
            />
          </div>
          <div className="w-full md:w-1/2 py-10 px-5 md:px-10">
            <div className="text-center mb-10">
              <h1 className="font-bold text-2xl">
                Enter your information to register
              </h1>
            </div>
            <div>
              <div className="flex -mx-3">
                <div className="w-1/2 px-3 mb-5">
                  <label
                    htmlFor="firstName"
                    className="text-xs font-semibold px-1"
                  >
                    First name
                  </label>
                  <div className="flex">
                    <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                      <i className="mdi mdi-account-outline text-gray-400 text-lg" />
                    </div>
                    <input
                      ref={firstName}
                      type="text"
                      className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-blue-600 text-gray-800"
                      placeholder="First Name"
                    />
                  </div>
                </div>
                <div className="w-1/2 px-3 mb-5">
                  <label
                    htmlFor="lastName"
                    className="text-xs font-semibold px-1"
                  >
                    Last name
                  </label>
                  <div className="flex">
                    <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                      <i className="mdi mdi-account-outline text-gray-400 text-lg" />
                    </div>
                    <input
                      ref={lastName}
                      type="text"
                      className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-blue-600 text-gray-800"
                      placeholder="Last Name"
                    />
                  </div>
                </div>
              </div>
              <div className="flex -mx-3">
                <div className="w-full px-3 mb-5">
                  <label htmlFor="email" className="text-xs font-semibold px-1">
                    Email
                  </label>
                  <div className="flex">
                    <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                      <i className="mdi mdi-email-outline text-gray-400 text-lg" />
                    </div>
                    <input
                      ref={email}
                      type="email"
                      className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-blue-600 text-gray-800"
                    />
                  </div>
                </div>
              </div>
              <div className="flex -mx-3">
                <div className="w-full px-3 mb-12">
                  <label
                    htmlFor="password"
                    className="text-xs font-semibold px-1"
                  >
                    Password
                  </label>
                  <div className="flex">
                    <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                      <i className="mdi mdi-lock-outline text-gray-400 text-lg" />
                    </div>
                    <input
                      ref={password}
                      type="password"
                      className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-blue-600 text-gray-800"
                      placeholder="************"
                    />
                  </div>
                </div>
                {/*confirm password*/}
                <div className="w-full px-3 mb-12">
                  <label
                    htmlFor="c_password"
                    className="text-xs font-semibold px-1"
                  >
                    Confirm Password
                  </label>
                  <div className="flex">
                    <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                      <i className="mdi mdi-lock-outline text-gray-400 text-lg" />
                    </div>
                    <input
                      ref={confirmPassword}
                      type="password"
                      className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-blue-600 text-gray-800"
                      placeholder="************"
                    />
                  </div>
                </div>
              </div>
              <div className="flex -mx-3">
                <div className="w-full px-3 mb-5">
                  <button
                    onClick={register}
                    className="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-full"
                    type="button"
                  >
                    Register Account
                  </button>
                </div>
              </div>
              <div className="text-center" />
              <div className="text-center">
                <a
                  className=" cursor-pointer inline-block text-sm text-blue-500 align-baseline hover:text-blue-800"
                  onClick={() => {
                    navigate("/login");
                  }}
                >
                  Already have an account? Login!
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
