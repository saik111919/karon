import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { X, DollarSign, Tag, List, ChevronDown } from "lucide-react";
import useToast from "../hooks/useToast";
import { AddTransactions } from "../services/services";
import { showNotification } from "../utils/common";

const ExpenseModal = ({ setIsModalOpen, fetchTransactions }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartY, setDragStartY] = useState(0);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const addToast = useToast();

  const onSubmit = (data) => {
    AddTransactions(data)
      .then(({ data }) => {
        reset();
        addToast("success", data.message);
        setIsModalOpen(false);
        fetchTransactions();
        showNotification(
          "Transaction Added",
          `A ${data.type} of ₹${data.amount} was added.`
        );
      })
      .catch((err) => {
        addToast(
          "error",
          err?.data?.message || "Something went wrong. Please try again."
        );
      });
  };

  const handleOutsideClick = (e) => {
    if (e.target === e.currentTarget) {
      setIsModalOpen(false);
      reset();
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      setIsModalOpen(false);
      reset();
    }
  };

  const handleTouchStart = (e) => {
    setIsDragging(true);
    setDragStartY(e.touches[0].clientY);
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    const currentY = e.touches[0].clientY;
    const dragDistance = currentY - dragStartY;
    if (dragDistance > 100) {
      setIsModalOpen(false);
      reset();
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-end lg:items-center justify-center z-50"
      onClick={handleOutsideClick}
    >
      <motion.div
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{ type: "spring", damping: 25, stiffness: 500 }}
        className="bg-gray-100 dark:bg-gray-800 w-full md:max-w-md lg:max-w-lg rounded-t-2xl lg:rounded-2xl shadow-xl overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <div className="lg:flex hidden justify-between items-center">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
              Add Transaction
            </h2>
            <button
              onClick={() => {
                setIsModalOpen(false);
                reset();
              }}
              className="text-gray-400 hover:text-gray-600 dark:text-gray-300 dark:hover:text-gray-100 transition-colors duration-200"
            >
              <X size={24} />
            </button>
          </div>
          <div className="w-12 h-1 bg-gray-300 dark:bg-gray-600 rounded-full mx-auto mt-2 lg:hidden"></div>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Title
            </label>
            <div className="relative">
              <Tag
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={18}
              />
              <input
                {...register("title", { required: "Title is required." })}
                type="text"
                id="title"
                className="w-full pl-10 pr-3 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 transition-colors duration-200"
                placeholder="Enter title"
              />
            </div>
            {errors.title && (
              <p className="mt-1 text-sm text-red-500 dark:text-red-400">
                {errors.title.message}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="amount"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Amount (₹)
            </label>
            <div className="relative">
              <DollarSign
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={18}
              />
              <input
                {...register("amount", {
                  required: "Amount is required.",
                  pattern: {
                    value: /^\d+(\.\d{1,2})?$/,
                    message: "Enter a valid amount.",
                  },
                })}
                type="number"
                id="amount"
                step="0.01"
                className="w-full pl-10 pr-3 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 transition-colors duration-200"
                placeholder="Enter amount"
              />
            </div>
            {errors.amount && (
              <p className="mt-1 text-sm text-red-500 dark:text-red-400">
                {errors.amount.message}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="type"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Type
            </label>
            <div className="relative">
              <List
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={18}
              />
              <select
                {...register("type", { required: "Please select a type." })}
                id="type"
                className="w-full pl-10 pr-10 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 transition-colors duration-200 appearance-none"
              >
                <option value="">Select a type</option>
                <option value="spent">Spent</option>
                <option value="credited">Credited</option>
              </select>
              <ChevronDown
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
                size={18}
              />
            </div>
            {errors.type && (
              <p className="mt-1 text-sm text-red-500 dark:text-red-400">
                {errors.type.message}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="category"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Category
            </label>
            <div className="relative">
              <Tag
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={18}
              />
              <select
                {...register("category", {
                  required: "Please select a category.",
                })}
                id="category"
                className="w-full pl-10 pr-10 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 transition-colors duration-200 appearance-none"
              >
                <option value="">Select a category</option>
                <option value="food">Food</option>
                <option value="transportation">Transportation</option>
                <option value="utilities">Utilities</option>
                <option value="entertainment">Entertainment</option>
                <option value="other">Other</option>
              </select>
              <ChevronDown
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
                size={18}
              />
            </div>
            {errors.category && (
              <p className="mt-1 text-sm text-red-500 dark:text-red-400">
                {errors.category.message}
              </p>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-gray-100 dark:focus:ring-offset-gray-800 transition-colors duration-200"
          >
            Add Transaction
          </button>
        </form>
      </motion.div>
    </motion.div>
  );
};

ExpenseModal.propTypes = {
  setIsModalOpen: PropTypes.func.isRequired,
  fetchTransactions: PropTypes.func.isRequired,
};

export default ExpenseModal;
