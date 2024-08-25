import PropTypes from "prop-types";
import { FiX } from "react-icons/fi";
import { useForm } from "react-hook-form";
import useToast from "../hooks/useToast";
import { AddTransactions } from "../services/services";

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
      })
      .catch((err) => {
        addToast(
          "error",
          err?.data?.message || "Something went wrong. Please try again."
        );
      });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md transform transition-all duration-300 ease-in-out">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-100">Add New Expense</h2>
          <button
            onClick={() => {
              setIsModalOpen(false);
              reset();
            }}
            className="text-gray-400 hover:text-gray-200 transition-colors duration-200"
          >
            <FiX className="text-2xl" />
          </button>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-300 mb-1"
            >
              Title
            </label>
            <input
              {...register("title", {
                required: "Title is required.",
              })}
              type="text"
              id="title"
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200"
              placeholder="Enter expense title"
            />
            {errors.title && (
              <p className="mt-1 text-sm text-red-400">
                {errors.title.message}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="amount"
              className="block text-sm font-medium text-gray-300 mb-1"
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
              type="number"
              id="amount"
              step="0.01"
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200"
              placeholder="Enter amount"
            />
            {errors.amount && (
              <p className="mt-1 text-sm text-red-400">
                {errors.amount.message}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="category"
              className="block text-sm font-medium text-gray-300 mb-1"
            >
              Category
            </label>
            <select
              {...register("type", {
                required: "Please select a type.",
              })}
              id="type"
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200"
            >
              <option value="">Select a type</option>
              <option value="spent">Spent</option>
              <option value="credited">Credited</option>
            </select>
            {errors.type && (
              <p className="mt-1 text-sm text-red-400">{errors.type.message}</p>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-gray-800 transition-colors duration-200"
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
