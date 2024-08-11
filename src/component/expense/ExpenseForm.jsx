import PropTypes from "prop-types";
import { CgAdd } from "react-icons/cg";
// import ExpenseModal from "./ExpenseModal";
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
    <div className='bg-white shadow-lg border border-gray-200 overflow-hidden'>
      <div className='bg-gradient-to-r from-blue-500 to-blue-600 p-2 border'>
        <div className='flex justify-between'>
          <span className='text-xl font-semibold text-white p-2'>
            Add Expense
          </span>
          <button
            className='p-2 shadow py-1 text-white bg-blue-600 hover:bg-blue-700 transition duration-300 ease-in-out flex items-center justify-center gap-2 rounded-lg border'
            type='button'
            onClick={handleOpenModal}
          >
            <CgAdd className='self-center' /> <span>Add Expense</span>
          </button>
        </div>
      </div>
      <div className='p-0'>
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
