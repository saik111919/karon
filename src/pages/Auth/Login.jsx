import { useForm } from "react-hook-form";
import { BiLogInCircle } from "react-icons/bi";
import { FaEnvelope } from "react-icons/fa";
import Password from "../../component/Password/Password";
import { Link, useNavigate } from "react-router-dom";
import useLoader from "../../hooks/useLoader";
import { loginFun } from "../../services/services";
import useToast from "../../hooks/useToast";
import { motion } from "framer-motion"; // Add this import

const Login = () => {
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
    <main className="bg-gradient-to-br from-gray-100 to-gray-300 dark:from-gray-900 dark:to-black text-gray-800 dark:text-gray-200 min-h-screen flex items-center justify-center p-4 transition-colors duration-300">
      <LoaderComp />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white dark:bg-gray-800 w-full max-w-md rounded-3xl shadow-2xl overflow-hidden"
      >
        <div className="p-8">
          <motion.div
            initial={{ scale: 0.5 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-8"
          >
            <BiLogInCircle className="text-6xl text-blue-500 dark:text-blue-400 mx-auto" />
            <p className="text-gray-600 dark:text-gray-400 mt-2 font-semibold">
              Welcome back
            </p>
          </motion.div>
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-2"
              >
                Email Address
              </label>
              <div className="relative">
                <FaEnvelope className="absolute top-3 left-3 text-gray-400 dark:text-gray-600" />
                <input
                  type="email"
                  id="email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: /^\S+@\S+$/i,
                  })}
                  className={`w-full py-2 pl-10 pr-3 bg-gray-100 dark:bg-gray-700 rounded-lg focus:outline-none focus:ring-2 ${
                    errors.email
                      ? "focus:ring-red-500 dark:focus:ring-red-400"
                      : "focus:ring-blue-500 dark:focus:ring-blue-400"
                  } transition-colors duration-300`}
                  placeholder="you@example.com"
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-sm text-red-500 dark:text-red-400">
                  {errors.email.message}
                </p>
              )}
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-2"
              >
                Password
              </label>
              <Password
                register={register("password", {
                  required: "Password is required",
                  minLength: 6,
                })}
                errors={errors.password}
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-500 dark:text-red-400">
                  {errors.password.message}
                </p>
              )}
            </motion.div>
            <motion.button
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full py-3 bg-blue-600 dark:bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-700 dark:hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-gray-100 dark:focus:ring-offset-gray-800 transition-colors duration-300"
            >
              Sign In
            </motion.button>
          </form>
          <div className="mt-8 text-center">
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Or continue with
            </p>
            <motion.div
              whileHover={{ scale: 1.03 }}
              className="px-8 py-4 bg-gray-100 dark:bg-gray-700 rounded-lg text-center transition-colors duration-300"
            >
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {"Don't"} have an account?{" "}
                <Link
                  to="/signup"
                  className="text-blue-600 dark:text-blue-400 hover:underline font-semibold"
                >
                  Sign up
                </Link>
              </p>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </main>
  );
};

export default Login;
