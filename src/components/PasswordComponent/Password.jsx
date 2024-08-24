import PropTypes from "prop-types";
import { useState } from "react";
import { FaEye, FaEyeSlash, FaLock } from "react-icons/fa";

const Password = ({ name = "password", register }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      <div className="relative">
        <FaLock className="absolute top-3 left-3 text-gray-400" />
        <input
          type={showPassword ? "text" : "password"}
          id={name}
          {...register}
          className="w-full py-2 pl-10 pr-10 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter your password"
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute top-3 right-2 text-gray-400 focus:outline-none"
        >
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </button>
      </div>
    </>
  );
};

Password.propTypes = {
  name: PropTypes.string,
  register: PropTypes.any,
};

export default Password;
