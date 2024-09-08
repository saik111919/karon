import { FaRupeeSign } from "react-icons/fa";
import { FiTrendingDown, FiTrendingUp } from "react-icons/fi";
import PropTypes from "prop-types";
import { memo, useState } from "react";
import { DeleteTransactions } from "../../services/services";
import useToast from "../../hooks/useToast";
import Card from "./Card";
import TransactionItem from "./TransactionItem";
import AlertModal from "../AlertModal";
import Slider from "react-slick";

const ExpenseTrackerCard = ({
  LoaderComp,
  setLoader,
  fetchTransactions,
  selectedMonth,
  handleMonthChange,
  transactions,
  totalSpent,
  totalCredited,
  remainingAmount,
  formattedLastMonth,
}) => {
  const [showAllTransactions, setShowAllTransactions] = useState(false);
  const addToast = useToast();
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [confirmToDelete, setConfirmToDelete] = useState(null);

  function deleteTransactions(id) {
    setLoader(true);
    DeleteTransactions(id)
      .then(({ data }) => {
        fetchTransactions();
        addToast("info", data.message);
      })
      .catch((err) => {
        addToast("error", err?.data?.message || "Error Occurred.");
      })
      .finally(() => {
        setLoader(false);
      });
  }

  const handleDeleteTransaction = (id) => {
    setConfirmToDelete(id);
  };

  const cards = [
    {
      title: "Total Balance",
      amount: remainingAmount,
      icon: <FaRupeeSign className='text-blue-200 dark:text-blue-400' />,
      color: "bg-blue-100 dark:bg-blue-900",
      textColor: "text-blue-900 dark:text-blue-200",
    },
    {
      title: "Income",
      amount: totalCredited,
      icon: <FiTrendingUp className='text-green-200 dark:text-green-400' />,
      color: "bg-green-100 dark:bg-green-900",
      textColor: "text-green-900 dark:text-green-200",
    },
    {
      title: "Expenses",
      amount: totalSpent,
      icon: <FiTrendingDown className='text-red-200 dark:text-red-400' />,
      color: "bg-red-100 dark:bg-red-900",
      textColor: "text-red-900 dark:text-red-200",
    },
  ];

  const visibleTransactions = showAllTransactions
    ? transactions
    : transactions.slice(-5);

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    swipeToSlide: true,
    autoplay: false,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 rounded hover:shadow-lg transition-all bg-white dark:bg-gradient-to-br dark:from-gray-900 dark:to-gray-800'>
      <div className='flex flex-col sm:flex-row justify-between items-center mb-8'>
        <h2 className='text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4 sm:mb-0'>
          {selectedMonth ? `Expenses for ${selectedMonth}` : "Expenses"}
        </h2>
        <div className='relative'>
          <input
            type='month'
            value={selectedMonth}
            onChange={handleMonthChange}
            max={formattedLastMonth}
            className='w-full sm:w-auto px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-500 transition-all duration-300'
          />
        </div>
      </div>

      <LoaderComp />

      <div className='relative'>
        <Slider {...settings} className='border rounded-lg shadow-sm'>
          {cards.map((card, index) => (
            <div key={index} className='px-2 my-2'>
              <Card {...card} />
            </div>
          ))}
        </Slider>
      </div>

      <div className='mt-6 dark:bg-gray-800 rounded-lg shadow-xl p-4 sm:p-6 border border-gray-300 dark:border-gray-700 bg-opacity-95'>
        <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6'>
          <h2 className='text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 dark:from-blue-300 dark:to-purple-400'>
            Recent Transactions
          </h2>
          <span className='text-sm text-gray-500 dark:text-gray-400'>
            {visibleTransactions.length} transactions
          </span>
        </div>

        {visibleTransactions.length > 0 ? (
          <div className='space-y-3'>
            {visibleTransactions
              .slice()
              .reverse()
              .map((transaction, index) => (
                <TransactionItem
                  key={index}
                  {...transaction}
                  onDelete={() => {
                    handleDeleteTransaction(transaction._id);
                    setShowConfirmModal(true);
                  }}
                />
              ))}
          </div>
        ) : (
          <div className='text-center py-6 sm:py-8'>
            <p className='text-gray-500 dark:text-gray-300 text-base sm:text-lg'>
              No transactions found
            </p>
            <p className='text-gray-400 dark:text-gray-400 text-sm mt-2'>
              Add a new transaction to get started
            </p>
          </div>
        )}
        {transactions.length > 5 && (
          <div className='mt-4 sm:mt-6 text-center'>
            <button
              onClick={() => setShowAllTransactions(!showAllTransactions)}
              className='bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition-all duration-300 text-sm sm:text-base'
            >
              {showAllTransactions ? "Show Less" : "Show More"}
            </button>
          </div>
        )}
      </div>
      <AlertModal
        isOpen={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        title='Warning'
        message='Are you sure you want to delete this transaction?'
        type='warning'
        confirmText="Yes, I'm sure"
        onConfirm={() => {
          deleteTransactions(confirmToDelete);
        }}
      />
    </div>
  );
};

ExpenseTrackerCard.propTypes = {
  LoaderComp: PropTypes.func.isRequired,
  setLoader: PropTypes.func.isRequired,
  fetchTransactions: PropTypes.func.isRequired,
  selectedMonth: PropTypes.string.isRequired,
  handleMonthChange: PropTypes.func.isRequired,
  transactions: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      amount: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      type: PropTypes.oneOf(["credited", "spent"]).isRequired,
      createdAt: PropTypes.string.isRequired,
    })
  ).isRequired,
  totalSpent: PropTypes.number.isRequired,
  totalCredited: PropTypes.number.isRequired,
  remainingAmount: PropTypes.number.isRequired,
  formattedLastMonth: PropTypes.string.isRequired,
};

export default memo(ExpenseTrackerCard);
