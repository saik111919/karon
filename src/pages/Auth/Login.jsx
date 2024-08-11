import { useForm } from "react-hook-form";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useLoader from "../../hooks/useLoader";
import { loginFun } from "../../services/services";
import useToast from "../../hooks/useToast";
import { BiLogInCircle } from "react-icons/bi";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const addToast = useToast();
  const [setLoader, LoaderComp] = useLoader();

  const onSubmit = (data) => {
    setLoader(true);
    loginFun(data)
      .then(({ data }) => {
        addToast("success", data.message, 5000);
        localStorage.setItem("token", data.token);
        localStorage.setItem("name", data.name);
        navigate("/");
      })
      .catch((err) => {
        const errMsg = err?.data?.message || "Error occurred.";
        addToast("error", errMsg, 5000);
      })
      .finally(() => {
        setLoader(false);
      });
  };

  return (
    <>
      <LoaderComp />
      <div className='min-h-screen w-full flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 p-4'>
        <div className='bg-white rounded-lg shadow-xl p-6 sm:p-8 w-full max-w-md'>
          <div className='text-center mb-8'>
            <BiLogInCircle className='text-5xl text-blue-600 mx-auto' />
            <h2 className='text-2xl sm:text-3xl font-bold mt-2'>
              Welcome Back
            </h2>
            <p className='text-gray-600 text-sm sm:text-base'>
              Login to your account
            </p>
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className='space-y-4 sm:space-y-6'
          >
            <div>
              <label
                htmlFor='email'
                className='block text-sm font-medium text-gray-700 mb-1'
              >
                Email
              </label>
              <input
                type='email'
                id='email'
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
                className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500'
              />
              {errors.email && (
                <p className='mt-1 text-xs text-red-500'>
                  {errors.email.message}
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor='password'
                className='block text-sm font-medium text-gray-700 mb-1'
              >
                Password
              </label>
              <div className='relative'>
                <input
                  type={passwordVisible ? "text" : "password"}
                  id='password'
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  })}
                  className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500'
                />
                <button
                  type='button'
                  onClick={() => setPasswordVisible(!passwordVisible)}
                  className='absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5'
                >
                  {passwordVisible ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {errors.password && (
                <p className='mt-1 text-xs text-red-500'>
                  {errors.password.message}
                </p>
              )}
            </div>
            <div className='flex items-center justify-between'>
              <label className='flex items-center'>
                <input
                  type='checkbox'
                  checked={rememberMe}
                  onChange={() => setRememberMe(!rememberMe)}
                  className='h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded'
                />
                <span className='ml-2 text-sm text-gray-600'>Remember me</span>
              </label>
              <Link
                to='/forgot-password'
                className='text-sm text-blue-600 hover:underline'
              >
                Forgot password?
              </Link>
            </div>
            <button
              type='submit'
              className='w-full bg-blue-600 text-white rounded-lg py-2 sm:py-3 text-sm sm:text-base font-semibold hover:bg-blue-700 transition duration-300'
            >
              Login
            </button>
          </form>
          <p className='mt-6 text-center text-sm text-gray-600'>
            {"Don't"} have an account?{" "}
            <Link
              to='/signup'
              className='font-medium text-blue-600 hover:underline'
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
