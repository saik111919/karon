import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Tooltip from "../../plugin/Tooltip";
import { FaTrashAlt } from "react-icons/fa";
import * as XLSX from "xlsx";

const DataTable = ({ data = [], onDeleteExpense }) => {
  // Get the current month in YYYY-M format
  const getCurrentMonth = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // No leading zero
    return `${year}-${month}`;
  };

  const currentMonth = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = (now.getMonth() + 1).toString().padStart(2, "0");
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

  // Update selectedDate when selectedMonth changes
  useEffect(() => {
    setSelectedDate("");
  }, [selectedMonth]);

  const handleExport = () => {
    const exportData = filteredTransactions.map(({ createdAt, ...rest }) => ({
      ...rest,
      createdAt: new Date(createdAt).toLocaleString(),
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Transactions");

    // Styling the worksheet
    const wscols = [
      { wch: 30 }, // Title column width
      { wch: 15 }, // Amount column width
      { wch: 15 }, // Type column width
      { wch: 20 }, // Date column width
    ];

    worksheet["!cols"] = wscols;

    // Add header styling
    const range = XLSX.utils.decode_range(worksheet["!ref"]);
    for (let C = range.s.c; C <= range.e.c; ++C) {
      const address = XLSX.utils.encode_col(C) + "1";
      if (!worksheet[address]) continue;
      worksheet[address].s = {
        font: { bold: true },
        alignment: { horizontal: "center" },
        fill: { fgColor: { rgb: "FFFF00" } },
      };
    }

    const dateStr = new Date().toLocaleDateString().replace(/\//g, "-");
    XLSX.writeFile(workbook, `transactions-${dateStr}.xlsx`);
  };

  return (
    <div className='p-4'>
      <div className='flex justify-between items-center border-2 border-b-2 rounded-t-md flex-wrap'>
        <input
          type='month'
          className='bg-inherit border border-inherit rounded-tl-md p-2 flex-1'
          value={
            selectedMonth.length === 6
              ? `${selectedMonth.slice(0, 5)}0${selectedMonth.slice(5)}`
              : selectedMonth
          }
          max={currentMonth()}
          onChange={(event) =>
            setSelectedMonth(
              event.target.value.length === 7
                ? event.target.value.replace("-0", "-")
                : event.target.value
            )
          }
        />
        <button
          className='bg-blue-500 text-white px-4 py-3 text-sm hover:bg-blue-600 transition duration-200 text-clip flex-1'
          onClick={handleExport}
        >
          <Tooltip tooltip={" Export To Excel"}>
            <div className='line-clamp-2'> Export To Excel</div>
          </Tooltip>
        </button>
        <select
          className='bg-inherit border border-inherit rounded-tr-md p-2 text-inherit flex-1'
          value={selectedDate}
          onChange={(event) => setSelectedDate(event.target.value)}
        >
          <option value=''>All Days</option>
          {uniqueDays.map((day) => (
            <option key={day} value={day}>
              {day}
            </option>
          ))}
        </select>
      </div>
      {filteredTransactions.length === 0 ? (
        <p className='text-inherit text-center border'>
          No data available for the selected month.
        </p>
      ) : (
        <div className='overflow-y-auto height-table '>
          <table className='min-w-full bg-inherit border border-inherit rounded-md'>
            <thead className='sticky -top-0.5  bg-inherit '>
              <tr className='bg-black text-white '>
                <th className='py-2 px-2 text-start border'>Title</th>
                <th className='py-2 px-2 text-start border'>Amount</th>
                <th className='py-2 px-2 text-start border'>Type</th>
                <th className='py-2 px-2 text-start border'>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.map((transaction) => (
                <tr key={transaction._id}>
                  <td className='py-2 px-2 text-start border max-w-20 overflow-hidden truncate'>
                    <Tooltip tooltip={transaction.title}>
                      <div className='line-clamp-2'>{transaction.title}</div>
                    </Tooltip>
                  </td>

                  <td className='py-2 px-2 text-start border'>
                    {transaction.amount}
                  </td>
                  <td className='py-4 px-2 text-start border'>
                    <span
                      className={`px-2 py-0 rounded-full text-center self-center align-middle text-white font-semibold border ${
                        transaction.type === "spent"
                          ? "bg-red-400 border-red-500"
                          : "bg-green-400 border-green-500"
                      } shadow-sm`}
                    >
                      {transaction.type}
                    </span>
                  </td>
                  <td className='py-2 px-2 text-start border'>
                    <div className='flex flex-wrap gap-2'>
                      <button
                        className='p-2 bg-red-500 text-white rounded hover:bg-red-600 transition duration-200'
                        onClick={() => {
                          onDeleteExpense(transaction._id);
                        }}
                      >
                        <FaTrashAlt className='w-5 h-5' />
                      </button>
                    </div>
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
