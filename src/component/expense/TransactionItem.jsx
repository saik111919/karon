import { useState } from "react";
import PropTypes from "prop-types";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  Clock,
  Trash2,
  TrendingDown,
  TrendingUp,
} from "lucide-react";
import { formatIndianCurrency } from "../../utils/common";

const TransactionItem = ({ amount, title, type, createdAt, onDelete }) => {
  const [isHolding, setIsHolding] = useState(false);
  const [touchStartTime, setTouchStartTime] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return {
      date: date.toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
      }),
      time: date.toLocaleTimeString("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
  };

  const { date, time } = formatDate(createdAt);
  const isCredit = type === "credited";

  const handleTouchStart = () => {
    setTouchStartTime(Date.now());
  };

  const handleTouchEnd = () => {
    const touchDuration = Date.now() - touchStartTime;
    if (touchDuration > 500) {
      setIsHolding(true);
      setTimeout(() => {
        onDelete();
        setIsHolding(false);
      }, 300);
    }
    setTouchStartTime(0);
  };

  const containerVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    hover: { scale: 1.05, boxShadow: "0px 5px 15px rgba(0,0,0,0.1)" },
  };

  const iconVariants = {
    initial: { rotate: 0 },
    hover: { rotate: 360, transition: { duration: 0.5 } },
  };

  const backgroundVariants = {
    initial: { opacity: 0 },
    hover: {
      opacity: 1,
      background: isCredit
        ? "linear-gradient(135deg, #4ade80 0%, #22c55e 100%)"
        : "linear-gradient(135deg, #f87171 0%, #ef4444 100%)",
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      whileHover="hover"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="dark:bg-gray-800 rounded-lg shadow-md p-4 transition-all duration-300 relative overflow-hidden"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <motion.div
        variants={backgroundVariants}
        initial="initial"
        animate={isHovered ? "hover" : "initial"}
        className="absolute inset-0 z-0"
      />
      <AnimatePresence>
        {isHolding && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-red-500 bg-opacity-50 flex items-center justify-center z-10"
          >
            <Trash2 className="text-white" size={24} />
          </motion.div>
        )}
      </AnimatePresence>
      <div className="flex items-center justify-between mb-3 relative z-10">
        <div className="flex items-center space-x-3">
          <motion.div
            variants={iconVariants}
            className={`w-10 h-10 rounded-full flex items-center justify-center ${
              isCredit
                ? "bg-green-100 text-green-600 dark:bg-green-700 dark:text-green-200"
                : "bg-red-100 text-red-600 dark:bg-red-700 dark:text-red-200"
            }`}
          >
            {isCredit ? <TrendingUp size={20} /> : <TrendingDown size={20} />}
          </motion.div>
          <div>
            <p
              className={`text-sm font-semibold truncate max-w-[150px] sm:max-w-[200px] text-gray-900 dark:text-gray-100 ${
                isHovered ? "text-white" : ""
              }`}
            >
              {title}
            </p>
            <p
              className={`text-sm font-bold ${
                isHovered
                  ? "text-white"
                  : isCredit
                  ? "text-green-600 dark:text-green-400"
                  : "text-red-600 dark:text-red-400"
              }`}
            >
              {formatIndianCurrency(amount)}
            </p>
          </div>
        </div>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={onDelete}
          className="hidden sm:block hover:bg-red-100 hover:text-red-700 text-red-500 dark:text-red-400 dark:hover:bg-red-900 dark:hover:text-red-200 p-2 rounded-full transition-colors duration-300"
        >
          <Trash2 size={20} />
        </motion.button>
      </div>
      <div className="flex justify-between items-center text-xs relative z-10">
        <div
          className={`flex items-center ${
            isHovered ? "text-white" : "text-gray-500 dark:text-gray-400"
          }`}
        >
          <Calendar className="mr-1" size={14} />
          <span>{date}</span>
        </div>
        <div
          className={`flex items-center ${
            isHovered ? "text-white" : "text-gray-500 dark:text-gray-400"
          }`}
        >
          <Clock className="mr-1" size={14} />
          <span>{time}</span>
        </div>
      </div>
    </motion.div>
  );
};

TransactionItem.propTypes = {
  amount: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  type: PropTypes.oneOf(["credited", "spent"]).isRequired,
  createdAt: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default TransactionItem;
