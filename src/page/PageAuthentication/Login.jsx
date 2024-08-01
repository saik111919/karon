import { useForm } from "react-hook-form";
import { loginFun } from "../../services/services";
import useLoader from "../../hooks/useLoader";
import useToast from "../../hooks/useToast";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { HiEye, HiEyeOff } from "react-icons/hi";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [setLoader, LoaderComp] = useLoader(false);
  const { showToast } = useToast();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = (data) => {
    setLoader(true);
    loginFun(data)
      .then(({ data }) => {
        showToast(data.message, "success");
        navigate("/karon/");
        localStorage.setItem("token", data.token);
      })
      .catch((err) => {
        showToast(
          err?.data?.message || "An error occurred. Please try again.",
          "error"
        );
        console.error(err);
      })
      .finally(() => {
        setLoader(false);
      });
  };

  return (
    <>
      <LoaderComp />
      <div className='flex items-center justify-center min-h-screen bg-gray-100'>
        <div className='w-full max-w-md p-8 space-y-6 rounded-lg shadow-lg bg-white'>
          <h1 className='text-3xl font-semibold text-center text-gray-700'>
            Login
          </h1>
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className='mb-6'>
              <label
                htmlFor='mobile'
                className='block mb-2 text-sm font-medium text-gray-600'
              >
                Mobile Number
              </label>
              <input
                id='mobile'
                type='tel'
                {...register("mobile", {
                  required: "Mobile number is required.",
                  pattern: {
                    value: /^[0-9]{10}$/,
                    message: "Enter a valid 10-digit mobile number.",
                  },
                })}
                aria-invalid={errors.mobile ? "true" : "false"}
                className={`w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                  errors.mobile ? "border-red-500" : "border-gray-300"
                }`}
                placeholder='1234567890'
              />
              {errors.mobile && (
                <p className='mt-1 text-sm text-red-500' role='alert'>
                  {errors.mobile.message}
                </p>
              )}
            </div>
            <div className='mb-6'>
              <label
                htmlFor='password'
                className='block mb-2 text-sm font-medium text-gray-600'
              >
                Password
              </label>
              <div className='relative'>
                <input
                  id='password'
                  type={showPassword ? "text" : "password"}
                  {...register("password", {
                    required: "Password is required.",
                  })}
                  aria-invalid={errors.password ? "true" : "false"}
                  className={`w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                    errors.password ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder='********'
                />
                <button
                  type='button'
                  onClick={() => setShowPassword(!showPassword)}
                  className='absolute inset-y-0 right-0 flex items-center px-3 text-gray-500'
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <HiEyeOff /> : <HiEye />}
                </button>
              </div>
              {errors.password && (
                <p className='mt-1 text-sm text-red-500' role='alert'>
                  {errors.password.message}
                </p>
              )}
            </div>
            <div className='flex items-center justify-between mb-6'>
              <button
                type='submit'
                className='px-4 py-2 font-semibold text-white bg-indigo-600 rounded hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500'
              >
                Login
              </button>
              <Link
                to='/karon/forgot-password'
                className='text-sm text-indigo-600 hover:text-indigo-800'
                onClick={(e) => e.preventDefault()}
                aria-disabled={true}
                disabled
              >
                Forgot Password?
              </Link>
            </div>
          </form>
          <div className='text-center'>
            <p className='text-sm text-gray-600'>
              Don’t have an account?{" "}
              <Link
                to='/karon/signup'
                className='font-semibold text-indigo-600 hover:text-indigo-800'
              >
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
