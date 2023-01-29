import axios from "axios";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../../components/Loader";
import { AuthContext } from "../../Context/AuthProvider";

const LogIn = () => {
  const [error, setError] = useState(null);
  const { LogIn, err, loading } = useContext(AuthContext);

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const handleLog = async (data) => {
    const { email, password } = data;

    const userInfo = {
      email,
      password,
    };

    LogIn(userInfo);

    navigate("/");

    // try {
    //   const url = "https://power-hack-six.vercel.app/api/login";
    //   const { data: res } = await axios.post(url, userInfo);
    //   localStorage.setItem("token", res.data);

    //   window.location = "/";
    // } catch (error) {
    //   if (
    //     error.response &&
    //     error.response.status >= 400 &&
    //     error.response.status <= 500
    //   ) {
    //     setError(error.response.data.message);
    //   }
    // }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div>
      <div className="min-h-screen bg-gray-100  flex flex-col justify-center sm:py-12">
        <div className="relative py-3 mx-auto sm:max-w-xl sm:mx-auto w-[70%] lg:w-[40%] ">
          <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
          <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
            <div className="max-w-md mx-auto">
              <div>
                <h1 className="text-2xl font-semibold">Log In</h1>
              </div>
              <form
                onSubmit={handleSubmit(handleLog)}
                className="divide-y divide-gray-200"
              >
                <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                  {/* for Email Field */}
                  <div className="relative">
                    <input
                      id="email"
                      type="email"
                      {...register("email", {
                        required: "Email field is Required",
                      })}
                      className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                      placeholder="Email address"
                    />

                    {errors.email && (
                      <p className="text-amber-500 text-sm">
                        {" "}
                        {errors.email?.message}{" "}
                      </p>
                    )}
                    <label
                      htmlFor="email"
                      className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                    >
                      Email Address
                    </label>
                  </div>

                  {/* For Password field */}
                  <div className="relative">
                    <input
                      id="password"
                      type="password"
                      {...register("password", {
                        required: " Password field is required",
                        minLength: {
                          value: 6,
                          message:
                            "Password length should be at least 6 character",
                        },
                      })}
                      className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                      placeholder="Password"
                    />
                    {errors.password && (
                      <p className="text-amber-500 text-sm">
                        {" "}
                        {errors.password?.message}
                      </p>
                    )}
                    <label
                      htmlFor="password"
                      className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                    >
                      Password
                    </label>
                  </div>
                  <div className="relative">
                    <p className="text-amber-400 font-bold"> {err} </p>
                  </div>
                  <div className="relative">
                    <button
                      type="submit"
                      className="btn btn-secondary btn-sm text-white rounded-md px-4 py-0"
                    >
                      Log In
                    </button>
                  </div>
                </div>
              </form>
              <div>
                <h1>
                  New To Power Pack?
                  <small className="text-secondary">
                    <Link to="/register"> Registration</Link>
                  </small>
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogIn;
