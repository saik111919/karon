import { useForm } from "react-hook-form";
import { FaUserPlus, FaEnvelope, FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom"; // Assuming you're using React Router
import Password from "../../component/Password/Password";
import useToast from "../../hooks/useToast";
import useLoader from "../../hooks/useLoader";
import { registerUser } from "../../services/services";

const Signup = () => {
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

  return (
    <main className='bg-gradient-to-br from-gray-900 to-black dark:from-gray-100 dark:to-gray-300 text-white dark:text-black min-h-screen flex items-center justify-center p-4'>
      <LoaderComp />
      <div className='bg-gray-800 dark:bg-gray-200 w-full max-w-md rounded-xl shadow-2xl overflow-hidden'>
        <div className='p-8'>
          <div className='text-center mb-8'>
            <FaUserPlus className='text-6xl text-green-500 dark:text-green-400 mx-auto animate-pulse' />
            <p className='text-gray-400 dark:text-gray-700 mt-2'>
              Sign up for a new account
            </p>
          </div>
          <form className='space-y-6' onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label
                htmlFor='name'
                className='block text-sm font-medium text-gray-400 dark:text-gray-600 mb-2'
              >
                Full Name
              </label>
              <div className='relative'>
                <FaUser className='absolute top-3 left-3 text-gray-400 dark:text-gray-600' />
                <input
                  type='text'
                  id='name'
                  {...register("name", {
                    required: "Name is required",
                    minLength: { value: 2, message: "Name is too short" },
                  })}
                  className='w-full py-2 pl-10 pr-3 bg-gray-700 dark:bg-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 dark:focus:ring-green-400'
                  placeholder='Enter your full name'
                />
              </div>
              {errors.name && (
                <p className='mt-1 text-sm text-red-500 dark:text-red-400'>
                  {errors.name.message}
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor='email'
                className='block text-sm font-medium text-gray-400 dark:text-gray-600 mb-2'
              >
                Email Address
              </label>
              <div className='relative'>
                <FaEnvelope className='absolute top-3 left-3 text-gray-400 dark:text-gray-600' />
                <input
                  type='email'
                  id='email'
                  {...register("email", {
                    required: "Email is required",
                    pattern: /^\S+@\S+$/i,
                  })}
                  className='w-full py-2 pl-10 pr-3 bg-gray-700 dark:bg-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 dark:focus:ring-green-400'
                  placeholder='Enter your email'
                />
              </div>
              {errors.email && (
                <p className='mt-1 text-sm text-red-500 dark:text-red-400'>
                  {errors.email.message}
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor='password'
                className='block text-sm font-medium text-gray-400 dark:text-gray-600 mb-2'
              >
                Password
              </label>
              <Password
                name='password'
                register={register("password", {
                  required: "Password is required",
                  minLength: 6,
                })}
              />
              {errors.password && (
                <p className='mt-1 text-sm text-red-500 dark:text-red-400'>
                  {errors.password.message}
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor='confirmPassword'
                className='block text-sm font-medium text-gray-400 dark:text-gray-600 mb-2'
              >
                Confirm Password
              </label>
              <Password
                name='confirmPassword'
                register={register("confirmPassword", {
                  required: "Please confirm your password",
                  validate: (val) =>
                    val === watch("password") || "Passwords do not match",
                })}
              />
              {errors.confirmPassword && (
                <p className='mt-1 text-sm text-red-500 dark:text-red-400'>
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>
            <button
              type='submit'
              className='w-full py-2 bg-green-600 dark:bg-green-500 text-white dark:text-gray-100 rounded-lg hover:bg-green-700 dark:hover:bg-green-400 focus:outline-none focus:ring-2 focus:ring-green-500 dark:focus:ring-green-400 focus:ring-offset-2 focus:ring-offset-gray-800 dark:focus:ring-offset-gray-200 transition-colors duration-300'
            >
              Sign Up
            </button>
          </form>
        </div>
        <div className='px-8 py-4 bg-gray-700 dark:bg-gray-400 border-t border-gray-600 dark:border-gray-300 text-center'>
          <p className='text-sm text-gray-400 dark:text-gray-700'>
            Already have an account?{" "}
            <Link
              to='/login'
              className='text-green-500 dark:text-green-400 hover:underline'
            >
              Log in
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
};

export default Signup;
