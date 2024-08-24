import { useState } from "react";
import {
  FiPlusCircle,
  FiTrendingUp,
  FiTrendingDown,
  FiPieChart,
} from "react-icons/fi";
import { FaRupeeSign } from "react-icons/fa";
import ExpenseModel from "../components/ExpenseModel";

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const formatIndianCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-4 sm:p-6 lg:p-8 text-gray-100">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 mb-8">
          Expense Tracker
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Total Balance Card */}
          <div className="bg-gray-800 rounded-2xl shadow-xl p-6 transform hover:scale-105 transition-transform duration-300 border border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-200">
                Total Balance
              </h2>
              <FaRupeeSign className="text-3xl text-blue-400" />
            </div>
            <p className="text-3xl font-bold text-gray-100">
              {formatIndianCurrency(524000)}
            </p>
          </div>

          {/* Income Card */}
          <div className="bg-gray-800 rounded-2xl shadow-xl p-6 transform hover:scale-105 transition-transform duration-300 border border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-200">Income</h2>
              <FiTrendingUp className="text-3xl text-green-400" />
            </div>
            <p className="text-3xl font-bold text-green-400">
              {formatIndianCurrency(354000)}
            </p>
          </div>

          {/* Expenses Card */}
          <div className="bg-gray-800 rounded-2xl shadow-xl p-6 transform hover:scale-105 transition-transform duration-300 border border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-200">Expenses</h2>
              <FiTrendingDown className="text-3xl text-red-400" />
            </div>
            <p className="text-3xl font-bold text-red-400">
              {formatIndianCurrency(230000)}
            </p>
          </div>

          {/* Savings Card */}
          <div className="bg-gray-800 rounded-2xl shadow-xl p-6 transform hover:scale-105 transition-transform duration-300 border border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-200">Savings</h2>
              <FiPieChart className="text-3xl text-purple-400" />
            </div>
            <p className="text-3xl font-bold text-purple-400">
              {formatIndianCurrency(124000)}
            </p>
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="mt-12 bg-gray-800 rounded-2xl shadow-xl p-6 border border-gray-700">
          <h2 className="text-2xl font-semibold text-gray-200 mb-6">
            Recent Transactions
          </h2>
          <div className="space-y-4">
            {[...Array(5)].map((_, index) => (
              <div
                key={index}
                className="flex items-center justify-between border-b border-gray-700 pb-4"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center">
                    <FaRupeeSign className="text-2xl text-blue-400" />
                  </div>
                  <div>
                    <p className="text-lg font-semibold text-gray-200">
                      Transaction {index + 1}
                    </p>
                    <p className="text-sm text-gray-400">Category</p>
                  </div>
                </div>
                <p className="text-lg font-semibold text-gray-200">
                  -{formatIndianCurrency(5000)}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Add Expense Button */}
        <button
          className="fixed bottom-8 right-8 bg-blue-500 text-white rounded-full p-4 shadow-lg hover:bg-blue-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-gray-900"
          onClick={() => setIsModalOpen(true)}
        >
          <FiPlusCircle className="text-3xl" />
        </button>
        {isModalOpen && <ExpenseModel setIsModalOpen={setIsModalOpen} />}
      </div>
    </div>
  );
};

export default Home;
