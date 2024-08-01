import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Tooltip from "../../plugin/Tooltip";
import { FaTrashAlt } from "react-icons/fa";
import { BiEditAlt } from "react-icons/bi";

const DataTable = ({ data, onDeleteExpense }) => {
  // Get the current month in YYYY-M format
  const getCurrentMonth = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // No leading zero
    return `${year}-${month}`;
  };

  const [selectedMonth, setSelectedMonth] = useState(getCurrentMonth());
  const [selectedDate, setSelectedDate] = useState("");

  // Filter data based on selected month
  const filteredData = data.find(
    (item) => item.monthYear === selectedMonth
  ) || { transactions: [] };

  // Get unique days from filtered transactions
  const uniqueDays = Array.from(
    new Set(
      filteredData.transactions.map((transaction) =>
        new Date(transaction.createdAt).getDate()
      )
    )
  ).sort((a, b) => a - b);

  // Filter transactions based on selected day
  const filteredTransactions = selectedDate
    ? filteredData.transactions.filter(
        (transaction) =>
          new Date(transaction.createdAt).getDate() ===
          parseInt(selectedDate, 10)
      )
    : filteredData.transactions;

  // function onDeleteExpense(id){

  // }

  // Update selectedDate when selectedMonth changes
  useEffect(() => {
    setSelectedDate("");
  }, [selectedMonth]);

  return (
    <div className='p-4'>
      <div className='flex mb-4 justify-between'>
        <input
          type='month'
          className='bg-inherit border border-inherit rounded-md p-2'
          value={
            selectedMonth.length === 6
              ? `${selectedMonth.slice(0, 5)}0${selectedMonth.slice(5)}`
              : selectedMonth
          }
          onChange={(event) =>
            setSelectedMonth(
              event.target.value.length === 7
                ? event.target.value.replace("-0", "-")
                : event.target.value
            )
          }
        />
        {uniqueDays.length > 1 && uniqueDays.length > 0 && (
          <select
            className='bg-inherit border border-inherit rounded-md p-2 ml-4'
            value={selectedDate}
            onChange={(event) => setSelectedDate(event.target.value)}
          >
            <option value='' className='bg-inherit text-inherit'>
              All Days
            </option>
            {uniqueDays.map((day) => (
              <option key={day} value={day} className='bg-inherit text-inherit'>
                {day}
              </option>
            ))}
          </select>
        )}
      </div>
      {filteredTransactions.length === 0 ? (
        <p className='text-inherit text-center'>
          No data available for the selected date.
        </p>
      ) : (
        <div className=' h-96 overflow-y-auto'>
          <table className='min-w-full bg-inherit border border-inherit rounded-md'>
            <thead className='sticky top-0 bg-inherit'>
              <tr className='bg-black text-white '>
                <th className='py-2 px-2 text-start border-b'>Title</th>
                <th className='py-2 px-2 text-start border-b'>Amount</th>
                <th className='py-2 px-2 text-start border-b'>Type</th>
                <th className='py-2 px-2 text-start border-b'>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.map((transaction) => (
                <tr key={transaction._id}>
                  <td className='py-2 px-2 text-start border-b max-w-20 truncate overflow-x-auto'>
                    {/* {transaction.title} */}
                    <Tooltip tooltip={transaction.title}>
                      {transaction.title}
                    </Tooltip>
                  </td>

                  <td className='py-2 px-2 text-start border-b'>
                    {transaction.amount}
                  </td>
                  <td className='py-2 px-2 text-start border-b'>
                    {transaction.type}
                  </td>
                  <td className='py-2 px-2 text-start border-b'>
                    <button
                      className='p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200 disabled:bg-slate-500'
                      disabled
                      onClick={() => {
                        console.log(transaction._id);
                      }}
                    >
                      <BiEditAlt className='w-5 h-5' />
                    </button>
                    <button
                      className='p-2 ml-2 bg-red-500 text-white rounded hover:bg-red-600 transition duration-200'
                      onClick={() => {
                        onDeleteExpense(transaction._id);
                      }}
                    >
                      <FaTrashAlt className='w-5 h-5' />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

DataTable.propTypes = {
  onDeleteExpense: PropTypes.func.isRequired,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      monthYear: PropTypes.string.isRequired,
      transactions: PropTypes.arrayOf(
        PropTypes.shape({
          _id: PropTypes.string.isRequired,
          createdAt: PropTypes.string.isRequired,
          type: PropTypes.string.isRequired,
          amount: PropTypes.number.isRequired,
          title: PropTypes.string.isRequired,
        })
      ).isRequired,
      totalCredited: PropTypes.number,
      totalSpent: PropTypes.number,
      remainingAmount: PropTypes.number,
    })
  ).isRequired,
};

export default DataTable;
