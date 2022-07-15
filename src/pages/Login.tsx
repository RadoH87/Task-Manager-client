import React from "react";
import { useNavigate } from "react-router-dom";
import { ApiConstants } from "../api/ApiConstants";
import custom_axios from "../axios/AxiosSetup";
import { toast } from "react-toastify";

export const Login = () => {
  const navigate = useNavigate();
  const email: any = React.useRef();
  const password: any = React.useRef();

  const loginApp = async () => {
    if (email.current.value == "" || password.current.value == "") {
      toast.info("Please fill the information");
      return;
    }
    try {
      const response = await custom_axios.post(ApiConstants.LOGIN, {
        email: email.current.value,
        password: password.current.value,
      });
      localStorage.setItem("token", response.data.token);
      dispatchEvent(new Event("storage"));
      navigate("/");
    } catch (error: any) {
      if (error.response.status == 401) toast.warn(error.response.data.message);
    }
  };

  return (
    <section className="h-screen">
      <div className="container mx-auto px-6 py-12 h-full">
        <div className="flex justify-center items-center flex-wrap h-full g-6 text-gray-800">
          <div className="md:w-8/12 lg:w-6/12 mb-12 md:mb-0">
            <img
              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
              className="w-full"
              alt="Phone image"
            />
          </div>
          <div className="md:w-8/12 lg:w-5/12 lg:ml-20">
            <p className="mb-8 text-white text-2xl text-center">
              Please login to your account
            </p>
            <div className="mb-6">
              <input
                ref={email}
                type="email"
                className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                name="email"
                v-model="form.email"
                placeholder="Email address"
              />
            </div>

            <div className="mb-6">
              <input
                ref={password}
                type="password"
                className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                name="password"
                v-model="form.password"
                autoComplete="current-password"
                placeholder="Password"
              />
            </div>

            <div className="flex justify-between items-center mb-6">
              <div className="form-group form-check">
                <p className="form-check-label inline-block text-white">
                  Don't have an account?
                </p>
              </div>
              <a
                onClick={() => navigate("/signUp")}
                className="cursor-pointer text-blue-600 hover:text-blue-700 focus:text-blue-700 active:text-blue-800 duration-200 transition ease-in-out"
              >
                Sign Up
              </a>
            </div>
            <button
              onClick={loginApp}
              className="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-full"
              data-mdb-ripple="true"
              data-mdb-ripple-color="light"
            >
              Sign in
            </button>
          </div>
        </div>
        <p className="text-center text-white uppercase text-xs">
          Copyright&copy;{new Date().getFullYear()}
          <span className="text-blue-600 font-bold">Radodev</span> all rights
          reserved
        </p>
      </div>
    </section>
  );
};
