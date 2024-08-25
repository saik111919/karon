import { FiPlusCircle } from "react-icons/fi";
import ExpenseTrackerCard from "../../component/expense/ExpenseTrackerCard";
import { useState } from "react";
import ExpenseModel from "../../component/ExpenseModel";
import useExpenseTracker from "../../hooks/useExpenseTracker";
import useTransaction from "../../hooks/useTransaction";

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data, LoaderComp, setLoader, fetchTransactions } = useTransaction();
  const {
    selectedMonth,
    handleMonthChange,
    transactions,
    totalSpent,
    totalCredited,
    remainingAmount,
    formattedLastMonth,
  } = useExpenseTracker(data);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-4 sm:p-6 lg:p-8 text-gray-100">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 mb-2 text-center">
          Expense Tracker
        </h1>
        <div>
          <ExpenseTrackerCard
            LoaderComp={LoaderComp}
            setLoader={setLoader}
            fetchTransactions={fetchTransactions}
            selectedMonth={selectedMonth}
            handleMonthChange={handleMonthChange}
            transactions={transactions}
            totalSpent={totalSpent}
            totalCredited={totalCredited}
            remainingAmount={remainingAmount}
            formattedLastMonth={formattedLastMonth}
          />
        </div>
      </div>
      <button
        className="fixed bottom-8 right-8 bg-blue-500 text-white rounded-full p-4 shadow-lg hover:bg-blue-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-gray-900"
        onClick={() => setIsModalOpen(true)}
      >
        <FiPlusCircle className="text-3xl" />
      </button>
      {isModalOpen && (
        <ExpenseModel
          setIsModalOpen={setIsModalOpen}
          fetchTransactions={fetchTransactions}
        />
      )}
    </div>
  );
};

export default Home;
