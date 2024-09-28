import { memo, useState } from "react";
import PropTypes from "prop-types";
import { motion, AnimatePresence } from "framer-motion";
import {
  Wallet,
  TrendingUp,
  TrendingDown,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import useToast from "../../hooks/useToast";
import TransactionItem from "./TransactionItem";
import AlertModal from "../AlertModal";
import { DeleteTransactions } from "../../services/services";
import ExpenseActions from "./ExpenseActions";

const Card = ({ title, amount, icon, color, textColor }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    className={`${color} ${textColor} p-6 rounded-2xl shadow-lg`}
  >
    <div className="flex justify-between items-center">
      <div>
        <p className="text-sm font-medium opacity-80">{title}</p>
        <h3 className="text-2xl font-bold mt-1">₹{amount.toLocaleString()}</h3>
      </div>
      <div className={`${textColor} opacity-80`}>{icon}</div>
    </div>
  </motion.div>
);

Card.propTypes = {
  title: PropTypes.string,
  amount: PropTypes.number,
  icon: PropTypes.any,
  color: PropTypes.string,
  textColor: PropTypes.string,
};

const ExpenseTrackerCard = ({
  LoaderComp,
  setLoader,
  fetchTransactions,
  selectedMonth,
  handleMonthChange,
  transactions,
  totalSpent,
  totalCredited,
  remainingAmount,
  formattedLastMonth,
}) => {
  const [showAllTransactions, setShowAllTransactions] = useState(false);
  const addToast = useToast();
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [confirmToDelete, setConfirmToDelete] = useState(null);

  const deleteTransactions = (id) => {
    setLoader(true);
    DeleteTransactions(id)
      .then(({ data }) => {
        fetchTransactions();
        addToast("info", data.message);
      })
      .catch((err) => {
        addToast("error", err?.data?.message || "Error Occurred.");
      })
      .finally(() => {
        setLoader(false);
      });
  };

  const handleDeleteTransaction = (id) => {
    setConfirmToDelete(id);
    setShowConfirmModal(true);
  };

  const cards = [
    {
      title: "Total Balance",
      amount: remainingAmount,
      icon: <Wallet size={24} />,
      color: "bg-gradient-to-br from-blue-400 to-blue-600",
      textColor: "text-white",
    },
    {
      title: "Income",
      amount: totalCredited,
      icon: <TrendingUp size={24} />,
      color: "bg-gradient-to-br from-green-400 to-green-600",
      textColor: "text-white",
    },
    {
      title: "Expenses",
      amount: totalSpent,
      icon: <TrendingDown size={24} />,
      color: "bg-gradient-to-br from-red-400 to-red-600",
      textColor: "text-white",
    },
  ];

  const visibleTransactions = showAllTransactions
    ? transactions
    : transactions.slice(-5);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 rounded-2xl dark:bg-gray-800 shadow-xl"
    >
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
        <motion.h2
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:text-3xl md:text-3xl text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4 sm:mb-0"
        >
          {selectedMonth ? `Expenses for ${selectedMonth}` : "Expenses"}
        </motion.h2>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="relative"
        >
          <input
            type="month"
            value={selectedMonth}
            onChange={handleMonthChange}
            max={formattedLastMonth}
            className="w-full sm:w-auto px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-500 transition-all duration-300"
          />
        </motion.div>
      </div>

      <LoaderComp />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8"
      >
        {cards.map((card, index) => (
          <Card key={index} {...card} />
        ))}
      </motion.div>

      <ExpenseActions fetchTransactions={fetchTransactions} />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="bg-gray-50 dark:bg-gray-700 rounded-2xl shadow-lg p-6"
      >
        <div className="flex justify-between items-center mb-6 flex-wrap">
          <h2 className="lg:text-2xl md:text-2xl text-lg font-bold text-gray-900 sm:text-center dark:text-gray-100">
            Recent Transactions
          </h2>
          <span className="text-sm text-gray-500 dark:text-gray-400 sm:text-center">
            {visibleTransactions.length} transactions
          </span>
        </div>

        <AnimatePresence>
          {visibleTransactions.length > 0 ? (
            <motion.div className="space-y-4">
              {visibleTransactions
                .slice()
                .reverse()
                .map((transaction, index) => (
                  <motion.div
                    key={transaction._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <TransactionItem
                      {...transaction}
                      onDelete={() => handleDeleteTransaction(transaction._id)}
                    />
                  </motion.div>
                ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-8"
            >
              <p className="text-gray-500 dark:text-gray-300 text-lg">
                No transactions found
              </p>
              <p className="text-gray-400 dark:text-gray-400 text-sm mt-2">
                Add a new transaction to get started
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {transactions.length > 5 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-6 text-center"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowAllTransactions(!showAllTransactions)}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition-all duration-300 flex items-center justify-center mx-auto"
            >
              {showAllTransactions ? (
                <>
                  Show Less <ChevronUp className="ml-2" size={18} />
                </>
              ) : (
                <>
                  Show More <ChevronDown className="ml-2" size={18} />
                </>
              )}
            </motion.button>
          </motion.div>
        )}
      </motion.div>

      <AlertModal
        isOpen={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        title="Are you sure?"
        type="delete"
        onConfirm={() => {
          deleteTransactions(confirmToDelete);
          setShowConfirmModal(false);
        }}
      />
    </motion.div>
  );
};

ExpenseTrackerCard.propTypes = {
  LoaderComp: PropTypes.func.isRequired,
  setLoader: PropTypes.func.isRequired,
  fetchTransactions: PropTypes.func.isRequired,
  selectedMonth: PropTypes.string.isRequired,
  handleMonthChange: PropTypes.func.isRequired,
  transactions: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      amount: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      type: PropTypes.oneOf(["credited", "spent"]).isRequired,
      createdAt: PropTypes.string.isRequired,
    })
  ).isRequired,
  totalSpent: PropTypes.number.isRequired,
  totalCredited: PropTypes.number.isRequired,
  remainingAmount: PropTypes.number.isRequired,
  formattedLastMonth: PropTypes.string.isRequired,
};

export default memo(ExpenseTrackerCard);
