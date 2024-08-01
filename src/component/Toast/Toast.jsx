// import PropTypes from "prop-types";
// import {
//   FaCheckCircle,
//   FaTimesCircle,
//   FaInfoCircle,
//   FaExclamationTriangle,
// } from "react-icons/fa";

// const Toast = ({ message, onClose, type = "success" }) => {
//   const getToastStyles = () => {
//     switch (type) {
//       case "success":
//         return "bg-green-500 text-white";
//       case "error":
//         return "bg-red-500 text-white";
//       case "info":
//         return "bg-blue-500 text-white";
//       case "warning":
//         return "bg-yellow-500 text-black";
//       default:
//         return "bg-gray-800 text-white";
//     }
//   };

//   const getIcon = () => {
//     switch (type) {
//       case "success":
//         return <FaCheckCircle className='text-2xl' />;
//       case "error":
//         return <FaTimesCircle className='text-2xl' />;
//       case "info":
//         return <FaInfoCircle className='text-2xl' />;
//       case "warning":
//         return <FaExclamationTriangle className='text-2xl' />;
//       default:
//         return null;
//     }
//   };

//   return (
//     <div
//       className={`p-4 rounded-lg shadow-lg flex items-start space-x-4 ${getToastStyles()}`}
//       role='alert'
//     >
//       {getIcon()}
//       <div className='flex-1'>
//         <span>{message}</span>
//       </div>
//       <button
//         className='ml-4 text-lg font-bold cursor-pointer'
//         onClick={onClose}
//       >
//         &times;
//       </button>
//     </div>
//   );
// };

// Toast.propTypes = {
//   message: PropTypes.string.isRequired,
//   onClose: PropTypes.func.isRequired,
//   type: PropTypes.oneOf(["success", "error", "info", "warning"]),
// };

// export default Toast;

import PropTypes from "prop-types";
import {
  FaCheckCircle,
  FaTimesCircle,
  FaInfoCircle,
  FaExclamationTriangle,
} from "react-icons/fa";

const Toast = ({ message, onClose, type = "success" }) => {
  const getToastStyles = () => {
    switch (type) {
      case "success":
        return "bg-green-500 text-white";
      case "error":
        return "bg-red-500 text-white";
      case "info":
        return "bg-blue-500 text-white";
      case "warning":
        return "bg-yellow-500 text-black";
      default:
        return "bg-gray-800 text-white";
    }
  };

  const getIcon = () => {
    switch (type) {
      case "success":
        return <FaCheckCircle className='text-2xl' />;
      case "error":
        return <FaTimesCircle className='text-2xl' />;
      case "info":
        return <FaInfoCircle className='text-2xl' />;
      case "warning":
        return <FaExclamationTriangle className='text-2xl' />;
      default:
        return null;
    }
  };

  return (
    <div
      className={`p-4 rounded-lg shadow-lg flex items-start space-x-4 ${getToastStyles()} transition-transform transform-gpu duration-300 ease-in-out`}
      role='alert'
    >
      {getIcon()}
      <div className='flex-1'>
        <span>{message}</span>
      </div>
      <button
        className='ml-4 text-lg font-bold cursor-pointer'
        onClick={onClose}
      >
        &times;
      </button>
    </div>
  );
};

Toast.propTypes = {
  message: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  type: PropTypes.oneOf(["success", "error", "info", "warning"]),
};

export default Toast;
