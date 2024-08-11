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
    <div className='min-h-full bg-gradient-to-br from-purple-100 to-indigo-200 lg:p-4 p-0 md:p-8'>
      <LoaderComp />
      <div className=' bg-white lg:rounded-2xl rounded-b-2xl shadow-xl overflow-hidden'>
        <div className='lg:p-6 p-8'>
          <div className='flex flex-col sm:flex-row justify-between items-center mb-6'>
            <h2 className='text-3xl font-bold text-gray-800 mb-4 sm:mb-0'>
              Expenses {selectedMonth && "for"} {selectedMonth}
            </h2>
            <input
              type='month'
              value={selectedMonth}
              onChange={handleMonthChange}
              max={formattedLastMonth}
              className='w-full sm:w-auto px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300'
            />
          </div>

          {transactions.length === 0 ? (
            <div className='text-center py-12'>
              <p className='text-xl text-gray-600'>
                No transactions available {selectedMonth && "for"}{" "}
                {selectedMonth}.
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
    </div>
  );
};

const StatCard = ({ title, value, icon: Icon, iconColor, bgColor }) => (
  <div
    className={`${bgColor} rounded-xl p-6 transition-all duration-300 hover:shadow-lg`}
  >
    <div className='flex items-center justify-between'>
      <div>
        <p className='text-gray-600 font-medium mb-1'>{title}</p>
        <p className='text-2xl font-bold text-gray-800'>
          ₹{value.toLocaleString()}
        </p>
      </div>
      <div
        className={`${iconColor} p-3 rounded-full ${bgColor.replace(
          "100",
          "200"
        )}`}
      >
        <Icon className='text-2xl' />
      </div>
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
