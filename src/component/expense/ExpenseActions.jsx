import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import PropTypes from "prop-types";
import ExpenseModel from "../ExpenseModel";
import { Plus, Download, PlusCircle } from "lucide-react";

const ExpenseActions = ({ fetchTransactions }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const buttonVariants = {
    hover: {
      scale: 1.05,
      boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.1)",
      transition: { type: "spring", stiffness: 400, damping: 10 },
    },
    tap: { scale: 0.95 },
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="dark:bg-gray-800 rounded-3xl mb-6 shadow-lg p-4 sm:p-6"
      >
        <div className="flex justify-between items-center gap-2">
          <motion.button
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            onClick={() => setIsModalOpen(true)}
            className="flex items-center justify-center w-full lg:space-x-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-6 py-3 rounded-full transition-all duration-300 shadow-md"
          >
            <Plus size={20} className="hidden lg:block" />
            <PlusCircle size={20} className="lg:hidden block" />
            <span className="hidden lg:block">Add Expense</span>
          </motion.button>
          <motion.button
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            className="flex items-center justify-center w-full lg:space-x-2 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-6 py-3 rounded-full transition-all duration-300 shadow-md"
          >
            <Download size={20} />
            <span className="hidden lg:block">Export</span>
          </motion.button>
        </div>
      </motion.div>
      <AnimatePresence>
        {isModalOpen && (
          <ExpenseModel
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
            fetchTransactions={fetchTransactions}
          />
        )}
      </AnimatePresence>
    </>
  );
};

ExpenseActions.propTypes = {
  fetchTransactions: PropTypes.func.isRequired,
};

export default ExpenseActions;
