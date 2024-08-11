import { FaCreditCard, FaMoneyBillAlt, FaRupeeSign } from "react-icons/fa";
import useExpenseTracker from "../../hooks/useExpenseTracker";
import useTransaction from "../../hooks/useTransaction";
import StatCard from "./StatCard";

const ExpenseTrackerCard = () => {
  const { data, LoaderComp } = useTransaction();

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
    <div className='min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100 py-12 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-7xl mx-auto'>
        <div className='bg-white backdrop-filter backdrop-blur-lg bg-opacity-30 rounded-3xl shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl'>
          <LoaderComp />
          <div className='p-6 sm:p-10'>
            <div className='flex flex-col sm:flex-row justify-between items-center mb-10 space-y-4 sm:space-y-0'>
              <h2 className='text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight'>
                {selectedMonth ? `Expenses for ${selectedMonth}` : "Expenses"}
              </h2>
              <div className='relative'>
                <input
                  type='month'
                  value={selectedMonth}
                  onChange={handleMonthChange}
                  max={formattedLastMonth}
                  className='w-full sm:w-auto px-4 py-2 border-2 border-indigo-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 hover:border-indigo-400 text-gray-700'
                />
                <div className='absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none'>
                  <svg
                    className='h-5 w-5 text-gray-400'
                    fill='currentColor'
                    viewBox='0 0 20 20'
                  >
                    <path
                      fillRule='evenodd'
                      d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z'
                      clipRule='evenodd'
                    />
                  </svg>
                </div>
              </div>
            </div>

            {transactions.length === 0 ? (
              <div className='text-center py-20'>
                <p className='text-2xl sm:text-3xl text-gray-600 animate-pulse'>
                  No transactions available
                  {selectedMonth && ` for ${selectedMonth}`}
                </p>
              </div>
            ) : (
              <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8'>
                <StatCard
                  title='Spent'
                  value={totalSpent}
                  icon={FaRupeeSign}
                  iconColor='text-red-500'
                  bgColor='bg-red-50'
                  textColor='text-red-700'
                />
                <StatCard
                  title='Credited'
                  value={totalCredited}
                  icon={FaCreditCard}
                  iconColor='text-green-500'
                  bgColor='bg-green-50'
                  textColor='text-green-700'
                />
                <StatCard
                  title='Remaining'
                  value={remainingAmount}
                  icon={FaMoneyBillAlt}
                  iconColor='text-blue-500'
                  bgColor='bg-blue-50'
                  textColor='text-blue-700'
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpenseTrackerCard;
