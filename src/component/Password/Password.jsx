import PropTypes from "prop-types";
import { useState } from "react";
import { FaEye, FaEyeSlash, FaLock } from "react-icons/fa";
import { motion } from "framer-motion";

const Password = ({
  name = "password",
  register,
  placeholder = "••••••••",
  errors,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300 }}
      className="relative"
    >
      <FaLock className="absolute top-3 left-3 text-gray-400 dark:text-gray-600 transition-colors duration-300" />
      <input
        type={showPassword ? "text" : "password"}
        id={name}
        {...register}
        className={`w-full py-2 pl-10 pr-10 bg-gray-100 dark:bg-gray-700 rounded-lg focus:outline-none focus:ring-2 ${
          errors
            ? "focus:ring-red-500 dark:focus:ring-red-400"
            : "focus:ring-green-500 dark:focus:ring-green-400"
        } transition-colors duration-300`}
        placeholder={placeholder}
      />
      <motion.button
        type="button"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setShowPassword(!showPassword)}
        className="absolute top-2 right-2 text-gray-400 dark:text-gray-600 focus:outline-none p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-300"
      >
        {showPassword ? <FaEyeSlash /> : <FaEye />}
      </motion.button>
    </motion.div>
  );
};

Password.propTypes = {
  name: PropTypes.string,
  register: PropTypes.any,
  placeholder: PropTypes.string,
  errors: PropTypes.object,
};

export default Password;
