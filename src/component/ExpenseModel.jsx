import PropTypes from "prop-types";
import { FiX } from "react-icons/fi";
import { useForm } from "react-hook-form";
import useToast from "../hooks/useToast";
import { AddTransactions } from "../services/services";
import { showNotification } from "../utils/common";
import { useEffect } from "react";

const ExpenseModel = ({ setIsModalOpen, fetchTransactions }) => {
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
          "Expense Added",
          `An expense of ₹${data?.amount} was added.`
        );
      })
      .catch((err) => {
        addToast(
          "error",
          err?.data?.message || "Something went wrong. Please try again."
        );
      });
  };

  // Close modal when clicking outside or pressing Esc key
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

  useEffect(() => {
    // Add keydown event listener
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      // Clean up event listener on component unmount
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div
      className='fixed inset-0 bg-black bg-opacity-50 flex items-end lg:items-center justify-center lg:p-4 z-50'
      onClick={handleOutsideClick}
    >
      <div className='bg-gray-800 dark:bg-gray-900 w-full md:max-w-sm lg:max-w-md rounded-t-lg lg:rounded-lg p-4 transform transition-all duration-300 ease-in-out'>
        <div className='flex justify-between items-center mb-4'>
          <h2 className='text-xl font-semibold text-gray-100 dark:text-gray-200'>
            Add Expense
          </h2>
          <button
            onClick={() => {
              setIsModalOpen(false);
              reset();
            }}
            className='text-gray-400 hover:text-gray-200 dark:text-gray-300 dark:hover:text-gray-100 transition-colors duration-200'
          >
            <FiX className='text-xl' />
          </button>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className='space-y-3'>
          <div>
            <label
              htmlFor='title'
              className='block text-sm font-medium text-gray-300 dark:text-gray-400 mb-1'
            >
              Title
            </label>
            <input
              {...register("title", { required: "Title is required." })}
              type='text'
              id='title'
              className='w-full px-3 py-2 bg-gray-700 dark:bg-gray-800 border border-gray-600 dark:border-gray-700 rounded-md text-gray-100 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 transition-colors duration-200'
              placeholder='Enter title'
            />
            {errors.title && (
              <p className='mt-1 text-sm text-red-400 dark:text-red-300'>
                {errors.title.message}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor='amount'
              className='block text-sm font-medium text-gray-300 dark:text-gray-400 mb-1'
            >
              Amount (₹)
            </label>
            <input
              {...register("amount", {
                required: "Amount is required.",
                pattern: {
                  value: /^\d+(\.\d{1,2})?$/,
                  message: "Enter a valid amount.",
                },
              })}
              type='number'
              id='amount'
              step='0.01'
              className='w-full px-3 py-2 bg-gray-700 dark:bg-gray-800 border border-gray-600 dark:border-gray-700 rounded-md text-gray-100 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 transition-colors duration-200'
              placeholder='Enter amount'
            />
            {errors.amount && (
              <p className='mt-1 text-sm text-red-400 dark:text-red-300'>
                {errors.amount.message}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor='type'
              className='block text-sm font-medium text-gray-300 dark:text-gray-400 mb-1'
            >
              Category
            </label>
            <select
              {...register("type", { required: "Please select a type." })}
              id='type'
              className='w-full px-3 py-2 bg-gray-700 dark:bg-gray-800 border border-gray-600 dark:border-gray-700 rounded-md text-gray-100 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 transition-colors duration-200'
            >
              <option value=''>Select a type</option>
              <option value='spent'>Spent</option>
              <option value='credited'>Credited</option>
            </select>
            {errors.type && (
              <p className='mt-1 text-sm text-red-400 dark:text-red-300'>
                {errors.type.message}
              </p>
            )}
          </div>
          <button
            type='submit'
            className='w-full bg-blue-500 dark:bg-blue-600 text-white dark:text-gray-900 py-2 px-4 rounded-md hover:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 dark:focus:ring-offset-gray-900 transition-colors duration-200'
          >
            Add Expense
          </button>
        </form>
      </div>
    </div>
  );
};

ExpenseModel.propTypes = {
  setIsModalOpen: PropTypes.func.isRequired,
  fetchTransactions: PropTypes.func.isRequired,
};

export default ExpenseModel;
