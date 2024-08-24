import { useForm } from "react-hook-form";
import { BiLogInCircle } from "react-icons/bi";
import { FaEnvelope } from "react-icons/fa";
import { Link } from "react-router-dom";
import Password from "../components/PasswordComponent/Password";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  function onSubmit(data) {
    console.log(data);
  }

  return (
    <main className="bg-gradient-to-br from-gray-900 to-black text-white min-h-screen flex items-center justify-center p-4">
      <div className="bg-gray-800 w-full max-w-md rounded-xl shadow-2xl overflow-hidden">
        <div className="p-8">
          <div className="text-center mb-8">
            <BiLogInCircle className="text-6xl text-blue-500 mx-auto animate-pulse" />
            <h2 className="text-3xl font-bold mt-4 text-blue-400">
              Welcome Back
            </h2>
            <p className="text-gray-400 mt-2">Login to your account</p>
          </div>
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-400 mb-2"
              >
                Email Address
              </label>
              <div className="relative">
                <FaEnvelope className="absolute top-3 left-3 text-gray-400" />
                <input
                  type="email"
                  id="email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: /^\S+@\S+$/i,
                  })}
                  className="w-full py-2 pl-10 pr-3 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your email"
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-400 mb-2"
              >
                Password
              </label>
              <Password
                register={register("password", {
                  required: "Password is required",
                  minLength: 6,
                })}
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>
            {/* <div className="text-right">
              <a href="#" className="text-sm text-blue-500 hover:underline">
                Forgot password?
              </a>
            </div> */}
            <button
              type="submit"
              className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-colors duration-300"
            >
              Sign In
            </button>
          </form>
        </div>
        <div className="px-8 py-4 bg-gray-700 border-t border-gray-600 text-center">
          <p className="text-sm text-gray-400">
            {"Don't"} have an account?{" "}
            <Link to="/signup" className="text-blue-500 hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
};

export default Login;
