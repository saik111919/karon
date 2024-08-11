import PropTypes from "prop-types";
import { FaCreditCard, FaMoneyBillAlt, FaRupeeSign } from "react-icons/fa";
import useExpenseTracker from "../../hooks/useExpenseTracker";
import useTransaction from "../../hooks/useTransaction";

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
    <div className='p-4 md:p-6 lg:p-8 bg-white bg-opacity-40 rounded-2xl shadow-lg'>
      <LoaderComp />
      <div className='bg-white p-4 md:p-6 lg:p-8 rounded-2xl shadow-inner'>
        <div className='flex flex-col sm:flex-row justify-between items-center mb-6'>
          <h2 className='text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-4 sm:mb-0'>
            {selectedMonth ? `Expenses for ${selectedMonth}` : "Expenses"}
          </h2>
          <input
            type='month'
            value={selectedMonth}
            onChange={handleMonthChange}
            max={formattedLastMonth}
            className='w-full sm:w-auto px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300'
          />
        </div>

        {transactions.length === 0 ? (
          <div className='text-center py-12'>
            <p className='text-lg md:text-xl text-gray-700'>
              No transactions available{" "}
              {selectedMonth && `for ${selectedMonth}`}
            </p>
          </div>
        ) : (
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
            <StatCard
              title='Spent'
              value={totalSpent}
              icon={FaRupeeSign}
              iconColor='text-red-500'
              bgColor='bg-red-100'
            />
            <StatCard
              title='Credited'
              value={totalCredited}
              icon={FaCreditCard}
              iconColor='text-green-500'
              bgColor='bg-green-100'
            />
            <StatCard
              title='Remaining'
              value={remainingAmount}
              icon={FaMoneyBillAlt}
              iconColor='text-blue-500'
              bgColor='bg-blue-100'
            />
          </div>
        )}
      </div>
    </div>
  );
};

const StatCard = ({ title, value, icon: Icon, iconColor, bgColor }) => (
  <div
    className={`flex items-center ${bgColor} p-4 md:p-6 rounded-xl shadow-md transition-all duration-300`}
  >
    <div className='flex-shrink-0'>
      <div
        className={`${iconColor} p-2 md:p-4 rounded-full bg-opacity-20 ${bgColor.replace(
          "100",
          "200"
        )}`}
      >
        <Icon className='text-2xl md:text-3xl' />
      </div>
    </div>
    <div className='ml-4'>
      <p className='text-lg md:text-xl font-semibold text-gray-800'>{title}</p>
      <p className='text-xl md:text-2xl font-bold text-gray-900'>
        ₹{value.toLocaleString()}
      </p>
    </div>
  </div>
);

StatCard.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  icon: PropTypes.elementType.isRequired,
  iconColor: PropTypes.string.isRequired,
  bgColor: PropTypes.string.isRequired,
};

export default ExpenseTrackerCard;
