import PropTypes from "prop-types";
import { motion } from "framer-motion";
import {
  FiCalendar,
  FiClock,
  FiTrash2,
  FiTrendingDown,
  FiTrendingUp,
} from "react-icons/fi";
import { formatIndianCurrency } from "../../utils/common";

const TransactionItem = ({ amount, title, type, createdAt, onDelete }) => {
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

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className='bg-gray-100 dark:bg-gray-800 rounded-lg p-3 sm:p-4 transition-all duration-300 hover:bg-gray-200 dark:hover:bg-gray-700 hover:shadow-lg'
    >
      <div className='flex items-center justify-between mb-2'>
        <div className='flex items-center space-x-2 sm:space-x-3'>
          <div
            className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center ${
              isCredit
                ? "bg-green-500 dark:bg-green-600"
                : "bg-red-500 dark:bg-red-600"
            }`}
          >
            {isCredit ? (
              <FiTrendingUp className='text-white text-xs sm:text-sm' />
            ) : (
              <FiTrendingDown className='text-white text-xs sm:text-sm' />
            )}
          </div>
          <p className='text-sm sm:text-base font-semibold text-gray-900 dark:text-gray-100 truncate max-w-[120px] sm:max-w-[150px] md:max-w-[200px]'>
            {title}
          </p>
        </div>
        <button
          onClick={onDelete}
          className='hover:text-red-700 text-red-500 dark:hover:text-red-400 transition-colors duration-300'
        >
          <FiTrash2 className='text-base sm:text-lg' />
        </button>
      </div>
      <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center mt-2'>
        <p
          className={`text-base sm:text-lg font-bold ${
            isCredit
              ? "text-green-500 dark:text-green-400"
              : "text-red-500 dark:text-red-400"
          }`}
        >
          {formatIndianCurrency(amount)}
        </p>
        <div className='flex items-center text-xs text-gray-500 dark:text-gray-400 mt-2 sm:mt-0'>
          <FiCalendar className='mr-1' />
          <span>{date}</span>
          <FiClock className='ml-2 mr-1' />
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
