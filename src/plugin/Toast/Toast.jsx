import { IoCloseCircleOutline, IoWarningOutline } from "react-icons/io5";
import { MdOutlineErrorOutline } from "react-icons/md";
import PropTypes from "prop-types";
import { BiInfoCircle } from "react-icons/bi";
import { FaRegCircleCheck } from "react-icons/fa6";

const Toast = ({ type, message, onClose }) => {
  const getIcon = () => {
    switch (type) {
      case "success":
        return <FaRegCircleCheck className="h-5 w-5" />;
      case "warning":
        return <IoWarningOutline className="h-5 w-5" />;
      case "error":
        return <MdOutlineErrorOutline className="h-5 w-5" />;
      case "info":
        return <BiInfoCircle className="h-5 w-5" />;
      default:
        return null;
    }
  };

  const baseClasses =
    "fixed bottom-4 right-4 max-w-sm rounded-lg shadow-lg transition-all duration-300 ease-in-out";
  const typeClasses = {
    success: "bg-green-100 text-green-800 border-l-4 border-green-500",
    warning: "bg-yellow-100 text-yellow-800 border-l-4 border-yellow-500",
    error: "bg-red-100 text-red-800 border-l-4 border-red-500",
    info: "bg-blue-100 text-blue-800 border-l-4 border-blue-500",
  };

  return (
    <div className={`${baseClasses} ${typeClasses[type]}`}>
      <div className="p-4">
        <div className="flex items-center">
          <div className="flex-shrink-0">{getIcon()}</div>
          <div className="ml-3 flex-1">
            <p className="text-sm font-medium">{message}</p>
          </div>
          <div className="ml-auto pl-3">
            <div className="-mx-1.5 -my-1.5">
              <button
                type="button"
                className="inline-flex rounded-md p-1.5 focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-200 ease-in-out"
                onClick={onClose}
              >
                <span className="sr-only">Dismiss</span>
                <IoCloseCircleOutline className="h-5 w-5 hover:text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Toast.propTypes = {
  type: PropTypes.oneOf(["success", "warning", "error", "info"]).isRequired,
  message: PropTypes.any.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Toast;
