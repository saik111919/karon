import PropTypes from "prop-types";
import { CgAdd } from "react-icons/cg";
import Button from "../../modules/Button/Button";
import Card from "../../modules/Card/Card";
import CardHeader from "../../modules/Card/CardHeader";
import CardBody from "../../modules/Card/CardBody";
import DataTable from "../../page/expanseTracker/DataTable";
import ExpenseModal from "./ExpenseModal";
import { useState } from "react";

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
    <Card className='mt-2 rounded-lg border-2'>
      <CardHeader className='p-2 rounded-t-lg bg-gray-300  border-b-2'>
        <div className='flex justify-between'>
          <span className='text-lg self-center px-2'>Add Expense</span>
          <Button
            className='px-3 shadow py-1 bg-blue-400 rounded'
            type='button'
            label={
              <div className='flex align-middle gap-2 text-inherit'>
                <CgAdd className='self-center' /> Add Expense
              </div>
            }
            onClick={handleOpenModal}
          />
        </div>
      </CardHeader>
      <CardBody>
        {isModalOpen && <ExpenseModal onClose={handleCloseModal} />}
        <DataTable data={data} onDeleteExpense={onDeleteExpense} />
      </CardBody>
    </Card>
  );
};

ExpenseForm.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  onDeleteExpense: PropTypes.func.isRequired,
  fetchTransactions: PropTypes.func.isRequired,
};

export default ExpenseForm;
