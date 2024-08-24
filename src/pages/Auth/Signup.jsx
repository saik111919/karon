// import { useForm } from "react-hook-form";
// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import useLoader from "../../hooks/useLoader";
// import { registerUser } from "../../services/services";
// import useToast from "../../hooks/useToast";
// import { BiUserPlus } from "react-icons/bi";
// import { FaEye, FaEyeSlash } from "react-icons/fa";

// const Signup = () => {
//   const [passwordVisible, setPasswordVisible] = useState(false);
//   const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     watch,
//   } = useForm();
//   const navigate = useNavigate();
//   const addToast = useToast();
//   const [setLoader, LoaderComp] = useLoader();

//   const onSubmit = (data) => {
//     setLoader(true);
//     registerUser(data)
//       .then(({ data }) => {
//         addToast("success", data.message, 5000);
//         navigate("/login");
//       })
//       .catch((err) => {
//         const errMsg = err?.data?.message || "Error occurred.";
//         addToast("error", errMsg, 5000);
//       })
//       .finally(() => {
//         setLoader(false);
//       });
//   };

//   const password = watch("password");

//   return (
//     <>
//       <LoaderComp />
//       <div className='min-h-screen w-full flex items-center justify-center bg-gradient-to-r from-green-400 to-blue-500 p-4'>
//         <div className='bg-white rounded-lg shadow-xl p-6 sm:p-8 w-full max-w-md'>
//           <div className='text-center mb-8'>
//             <BiUserPlus className='text-5xl text-green-600 mx-auto' />
//             <h2 className='text-2xl sm:text-3xl font-bold mt-2'>
//               Create an Account
//             </h2>
//             <p className='text-gray-600 text-sm sm:text-base'>Join us today</p>
//           </div>
//           <form
//             onSubmit={handleSubmit(onSubmit)}
//             className='space-y-4 sm:space-y-6'
//           >
//             <div>
//               <label
//                 htmlFor='name'
//                 className='block text-sm font-medium text-gray-700 mb-1'
//               >
//                 Full Name
//               </label>
//               <input
//                 type='text'
//                 id='name'
//                 {...register("name", {
//                   required: "Full name is required",
//                   minLength: {
//                     value: 2,
//                     message: "Name must be at least 2 characters",
//                   },
//                 })}
//                 className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500'
//               />
//               {errors.name && (
//                 <p className='mt-1 text-xs text-red-500'>
//                   {errors.name.message}
//                 </p>
//               )}
//             </div>
//             <div>
//               <label
//                 htmlFor='email'
//                 className='block text-sm font-medium text-gray-700 mb-1'
//               >
//                 Email
//               </label>
//               <input
//                 type='email'
//                 id='email'
//                 {...register("email", {
//                   required: "Email is required",
//                   pattern: {
//                     value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
//                     message: "Invalid email address",
//                   },
//                 })}
//                 className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500'
//               />
//               {errors.email && (
//                 <p className='mt-1 text-xs text-red-500'>
//                   {errors.email.message}
//                 </p>
//               )}
//             </div>
//             <div>
//               <label
//                 htmlFor='password'
//                 className='block text-sm font-medium text-gray-700 mb-1'
//               >
//                 Password
//               </label>
//               <div className='relative'>
//                 <input
//                   type={passwordVisible ? "text" : "password"}
//                   id='password'
//                   {...register("password", {
//                     required: "Password is required",
//                     minLength: {
//                       value: 6,
//                       message: "Password must be at least 6 characters",
//                     },
//                   })}
//                   className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500'
//                 />
//                 <button
//                   type='button'
//                   onClick={() => setPasswordVisible(!passwordVisible)}
//                   className='absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5'
//                 >
//                   {passwordVisible ? <FaEyeSlash /> : <FaEye />}
//                 </button>
//               </div>
//               {errors.password && (
//                 <p className='mt-1 text-xs text-red-500'>
//                   {errors.password.message}
//                 </p>
//               )}
//             </div>
//             <div>
//               <label
//                 htmlFor='confirmPassword'
//                 className='block text-sm font-medium text-gray-700 mb-1'
//               >
//                 Confirm Password
//               </label>
//               <div className='relative'>
//                 <input
//                   type={confirmPasswordVisible ? "text" : "password"}
//                   id='confirmPassword'
//                   {...register("confirmPassword", {
//                     required: "Please confirm your password",
//                     validate: (value) =>
//                       value === password || "Passwords do not match",
//                   })}
//                   className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500'
//                 />
//                 <button
//                   type='button'
//                   onClick={() =>
//                     setConfirmPasswordVisible(!confirmPasswordVisible)
//                   }
//                   className='absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5'
//                 >
//                   {confirmPasswordVisible ? <FaEyeSlash /> : <FaEye />}
//                 </button>
//               </div>
//               {errors.confirmPassword && (
//                 <p className='mt-1 text-xs text-red-500'>
//                   {errors.confirmPassword.message}
//                 </p>
//               )}
//             </div>
//             <button
//               type='submit'
//               className='w-full bg-green-600 text-white rounded-lg py-2 sm:py-3 text-sm sm:text-base font-semibold hover:bg-green-700 transition duration-300'
//             >
//               Sign Up
//             </button>
//           </form>
//           <p className='mt-6 text-center text-sm text-gray-600'>
//             Already have an account?{" "}
//             <Link
//               to='/login'
//               className='font-medium text-green-600 hover:underline'
//             >
//               Log in
//             </Link>
//           </p>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Signup;
import { useForm } from "react-hook-form";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useLoader from "../../hooks/useLoader";
import { registerUser } from "../../services/services";
import useToast from "../../hooks/useToast";
import { BiUserPlus } from "react-icons/bi";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Signup = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  const navigate = useNavigate();
  const addToast = useToast();
  const [setLoader, LoaderComp] = useLoader();

  const onSubmit = (data) => {
    setLoader(true);
    registerUser(data)
      .then(({ data }) => {
        addToast("success", data.message, 5000);
        navigate("/login");
      })
      .catch((err) => {
        const errMsg = err?.data?.message || "Error occurred.";
        addToast("error", errMsg, 5000);
      })
      .finally(() => {
        setLoader(false);
      });
  };

  const password = watch("password");

  return (
    <>
      <LoaderComp />
      <div className='min-h-screen w-full flex items-center justify-center bg-gradient-to-r from-green-400 to-blue-500 p-4'>
        <div className='bg-white rounded-lg shadow-xl p-6 w-full max-w-lg lg:max-w-md'>
          <div className='text-center mb-8'>
            <BiUserPlus className='text-5xl text-green-600 mx-auto' />
            <h2 className='text-2xl sm:text-3xl font-bold mt-2'>
              Create an Account
            </h2>
            <p className='text-gray-600 text-sm sm:text-base'>Join us today</p>
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className='space-y-4 sm:space-y-6'
          >
            <div>
              <label
                htmlFor='name'
                className='block text-sm font-medium text-gray-700 mb-1'
              >
                Full Name
              </label>
              <input
                type='text'
                id='name'
                {...register("name", {
                  required: "Full name is required",
                  minLength: {
                    value: 2,
                    message: "Name must be at least 2 characters",
                  },
                })}
                className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500'
              />
              {errors.name && (
                <p className='mt-1 text-xs text-red-500'>
                  {errors.name.message}
                </p>
              )}
            </div>
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
                className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500'
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
                  className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500'
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
            <div>
              <label
                htmlFor='confirmPassword'
                className='block text-sm font-medium text-gray-700 mb-1'
              >
                Confirm Password
              </label>
              <div className='relative'>
                <input
                  type={confirmPasswordVisible ? "text" : "password"}
                  id='confirmPassword'
                  {...register("confirmPassword", {
                    required: "Please confirm your password",
                    validate: (value) =>
                      value === password || "Passwords do not match",
                  })}
                  className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500'
                />
                <button
                  type='button'
                  onClick={() =>
                    setConfirmPasswordVisible(!confirmPasswordVisible)
                  }
                  className='absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5'
                >
                  {confirmPasswordVisible ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className='mt-1 text-xs text-red-500'>
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>
            <button
              type='submit'
              className='w-full bg-green-600 text-white rounded-lg py-2 sm:py-3 text-sm sm:text-base font-semibold hover:bg-green-700 transition duration-300'
            >
              Sign Up
            </button>
          </form>
          <p className='mt-6 text-center text-sm text-gray-600'>
            Already have an account?{" "}
            <Link
              to='/login'
              className='font-medium text-green-600 hover:underline'
            >
              Log in
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Signup;
