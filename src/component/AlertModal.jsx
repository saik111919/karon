import { memo, useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  FaCheckCircle,
  FaExclamationCircle,
  FaTimesCircle,
  FaInfoCircle,
} from "react-icons/fa";

const AlertModal = ({
  isOpen,
  onClose,
  title,
  message,
  type = "info",
  onConfirm,
  confirmText = "Confirm",
}) => {
  const [isVisible, setIsVisible] = useState(isOpen);

  useEffect(() => {
    setIsVisible(isOpen);
  }, [isOpen]);

  if (!isVisible) return null;

  const getTypeStyles = () => {
    switch (type) {
      case "success":
        return {
          bgColor: "bg-green-50 dark:bg-green-800",
          textColor: "text-green-800 dark:text-green-100",
          borderColor: "border-green-500",
          icon: <FaCheckCircle className='w-6 h-6 text-green-600' />,
        };
      case "error":
        return {
          bgColor: "bg-red-50 dark:bg-red-800",
          textColor: "text-red-800 dark:text-red-100",
          borderColor: "border-red-500",
          icon: <FaTimesCircle className='w-6 h-6 text-red-600' />,
        };
      case "warning":
        return {
          bgColor: "bg-yellow-50 dark:bg-yellow-800",
          textColor: "text-yellow-800 dark:text-yellow-100",
          borderColor: "border-yellow-500",
          icon: <FaExclamationCircle className='w-6 h-6 text-yellow-600' />,
        };
      default:
        return {
          bgColor: "bg-blue-50 dark:bg-blue-800",
          textColor: "text-blue-800 dark:text-blue-100",
          borderColor: "border-blue-500",
          icon: <FaInfoCircle className='w-6 h-6 text-blue-600' />,
        };
    }
  };

  const { bgColor, textColor, borderColor, icon } = getTypeStyles();

  const handleConfirm = () => {
    if (onConfirm) {
      onConfirm();
    }
    setIsVisible(false);
  };

  const handleClose = () => {
    setIsVisible(false);
    if (onClose) onClose();
  };

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 dark:bg-opacity-70 flex items-center justify-center p-4 z-50'>
      <div
        className={`max-w-lg w-full bg-white dark:bg-gray-900 rounded-lg shadow-lg overflow-hidden ${borderColor} border-2`}
      >
        <div className={`p-6 ${bgColor}`}>
          <div className='flex items-center justify-between mb-4'>
            <div className='flex items-center space-x-3'>
              {icon}
              <h3 className={`text-xl font-semibold ${textColor}`}>{title}</h3>
            </div>
            <button
              onClick={handleClose}
              className='text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 transition-colors duration-200'
            >
              <FaTimesCircle className='w-6 h-6' />
            </button>
          </div>
          <p className={`text-md ${textColor}`}>{message}</p>
        </div>
        <div className='flex justify-end p-2 bg-gray-100 dark:bg-gray-800 rounded-b-lg'>
          <button
            onClick={handleClose}
            className='px-4 py-2 bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-md hover:bg-gray-400 dark:hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500 dark:focus:ring-gray-300 transition-colors duration-200'
          >
            Close
          </button>
          {confirmText && (
            <button
              onClick={handleConfirm}
              className='ml-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200'
            >
              {confirmText}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

AlertModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func,
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  type: PropTypes.oneOf(["info", "success", "error", "warning"]),
  showConfirm: PropTypes.bool,
  onConfirm: PropTypes.func,
  confirmText: PropTypes.string,
};

export default memo(AlertModal);
