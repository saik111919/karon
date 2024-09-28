// import { useState } from "react";
// import { FiPlusCircle } from "react-icons/fi";
import ExpenseTrackerCard from "../../component/expense/ExpenseTrackerCard";
// import ExpenseModel from "../../component/ExpenseModel";
import useExpenseTracker from "../../hooks/useExpenseTracker";
import useTransaction from "../../hooks/useTransaction";

const Home = () => {
  // const [isModalOpen, setIsModalOpen] = useState(false);
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
    <div
      className={`min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300`}
    >
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
            Welcome Back!
          </h2>
          <p className="mt-2 text-xl text-gray-600 dark:text-gray-400">
            {"Let's"} manage your expenses efficiently.
          </p>
        </div>

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

        {/* <button
          className="fixed lg:bottom-8 bottom-20 right-8 bg-blue-500 dark:bg-blue-600 text-white rounded-full lg:p-4 p-3 shadow-lg hover:bg-blue-600 dark:hover:bg-blue-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-gray-900"
          onClick={() => setIsModalOpen(true)}
        >
          <FiPlusCircle className="text-3xl" />
        </button> */}
      </main>

      {/* {isModalOpen && (
        <ExpenseModel
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          fetchTransactions={fetchTransactions}
        />
      )} */}
    </div>
  );
};

export default Home;
