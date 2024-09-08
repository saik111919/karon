import PropTypes from "prop-types";
import { useState } from "react";
import { FaEye, FaEyeSlash, FaLock } from "react-icons/fa";

const Password = ({
  name = "password",
  register,
  placeholder = "••••••••",
  errors,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      <div className='relative'>
        <FaLock className='absolute top-3 left-3 text-gray-400' />
        <input
          type={showPassword ? "text" : "password"}
          id={name}
          {...register}
          className={`w-full py-2 pl-10 pr-10 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 ${
            errors ? "focus:ring-red-500" : "focus:ring-blue-500"
          }`}
          placeholder={placeholder}
        />
        <button
          type='button'
          onClick={() => setShowPassword(!showPassword)}
          className='absolute top-3 right-2 text-gray-400 focus:outline-none'
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
  placeholder: PropTypes.any,
  errors: PropTypes.object,
};

export default Password;
// import PropTypes from "prop-types";
// import { useState } from "react";
// import { FaEye, FaEyeSlash, FaLock } from "react-icons/fa";

// const Password = ({
//   name = "password",
//   register,
//   placeholder = "••••••••",
//   errors,
// }) => {
//   const [showPassword, setShowPassword] = useState(false);

//   return (
//     <div className='relative'>
//       <FaLock className='absolute top-3 left-3 text-gray-400 dark:text-gray-500' />
//       <input
//         type={showPassword ? "text" : "password"}
//         id={name}
//         {...register}
//         className={`w-full py-2 pl-10 pr-10 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 ${
//           errors ? "focus:ring-red-500" : "focus:ring-blue-500"
//         }`}
//         placeholder={placeholder}
//       />
//       <button
//         type='button'
//         onClick={() => setShowPassword(!showPassword)}
//         className='absolute top-3 right-2 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 focus:outline-none transition-colors duration-200'
//       >
//         {showPassword ? <FaEyeSlash /> : <FaEye />}
//       </button>
//     </div>
//   );
// };

// Password.propTypes = {
//   name: PropTypes.string,
//   register: PropTypes.any,
//   placeholder: PropTypes.string,
//   errors: PropTypes.object,
// };

// export default Password;
