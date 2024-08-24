import PropTypes from "prop-types";
import { CgAdd } from "react-icons/cg";
import { useState } from "react";
import DataTable from "./DataTable";
import ExpenseModal from "./ExpenseModal";

const ExpenseForm = ({ data, onDeleteExpense, fetchTransactions }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = (state) => {
    setIsModalOpen(false);
    if (state) {
      fetchTransactions();
    }
  };

  return (
    <div className='bg-white shadow-lg border border-gray-200 rounded-lg overflow-hidden'>
      <div className='bg-gradient-to-r from-blue-500 to-blue-600 p-2 flex justify-between items-center'>
        <h2 className='text-xl sm:text-2xl font-semibold text-white'>
          Add Expense
        </h2>
        <button
          className='flex items-center gap-2 px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300 ease-in-out'
          type='button'
          onClick={handleOpenModal}
        >
          <CgAdd className='w-6 h-6' />
          <span className='hidden sm:block'>Add Expense</span>
        </button>
      </div>
      <div>
        {isModalOpen && <ExpenseModal onClose={handleCloseModal} />}
        <DataTable data={data} onDeleteExpense={onDeleteExpense} />
      </div>
    </div>
  );
};

ExpenseForm.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  onDeleteExpense: PropTypes.func.isRequired,
  fetchTransactions: PropTypes.func.isRequired,
};

export default ExpenseForm;
