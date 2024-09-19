import PropTypes from "prop-types";
import { motion, AnimatePresence } from "framer-motion";
import { Trash2, AlertCircle, CheckCircle, XCircle, Info } from "lucide-react";

const AlertModal = ({
  isOpen,
  onClose,
  onConfirm,
  type = "info",
  title = "Are you sure?",
}) => {
  const getTypeConfig = () => {
    switch (type) {
      case "success":
        return {
          icon: CheckCircle,
          color: "green",
          bgColor: "bg-green-600 dark:bg-green-700",
          hoverColor: "hover:bg-green-700 dark:hover:bg-green-800",
        };
      case "error":
        return {
          icon: XCircle,
          color: "red",
          bgColor: "bg-red-600 dark:bg-red-700",
          hoverColor: "hover:bg-red-700 dark:hover:bg-red-800",
        };
      case "warning":
        return {
          icon: AlertCircle,
          color: "yellow",
          bgColor: "bg-yellow-600 dark:bg-yellow-700",
          hoverColor: "hover:bg-yellow-700 dark:hover:bg-yellow-800",
        };
      case "delete":
        return {
          icon: Trash2,
          color: "red",
          bgColor: "bg-red-600 dark:bg-red-700",
          hoverColor: "hover:bg-red-700 dark:hover:bg-red-800",
        };
      default:
        return {
          icon: Info,
          color: "blue",
          bgColor: "bg-blue-600 dark:bg-blue-700",
          hoverColor: "hover:bg-blue-700 dark:hover:bg-blue-800",
        };
    }
  };

  const { icon: Icon, color, bgColor, hoverColor } = getTypeConfig();

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 bg-opacity-50 dark:bg-opacity-70 flex items-center justify-center p-4 z-50"
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            className="bg-gray-100 dark:bg-gray-800 lg:rounded-lg rounded-3xl shadow-lg overflow-hidden max-w-sm w-full"
          >
            <div className="p-4 flex flex-col items-center">
              <motion.div
                initial={{ rotate: -180, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
              >
                <Icon
                  className={`w-12 h-12 text-${color}-500 dark:text-${color}-400 mb-4`}
                />
              </motion.div>
              <h2 className="text-gray-900 dark:text-white text-xl font-semibold mb-4">
                {title}
              </h2>
              <div className="flex w-full space-x-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onClose}
                  className="flex-1 py-2 px-4 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 lg:rounded-md rounded-full hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200"
                >
                  Cancel
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onConfirm}
                  className={`flex-1 py-2 px-4 ${bgColor} text-white lg:rounded-md rounded-full ${hoverColor} transition-colors duration-200`}
                >
                  Confirm
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

AlertModal.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  onConfirm: PropTypes.func,
  type: PropTypes.string,
  title: PropTypes.string,
};

export default AlertModal;
