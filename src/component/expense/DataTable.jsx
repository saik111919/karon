import { useState, useEffect, useMemo } from "react";
import PropTypes from "prop-types";
import { FaTrashAlt } from "react-icons/fa";
import * as XLSX from "xlsx";
import { CgSoftwareDownload } from "react-icons/cg";

const DataTable = ({ data = [], onDeleteExpense }) => {
  const getCurrentMonth = () => {
    const date = new Date();
    return date.toISOString().slice(0, 7);
  };

  const [selectedMonth, setSelectedMonth] = useState(getCurrentMonth());
  const [selectedDate, setSelectedDate] = useState("");

  const filteredData = useMemo(() => {
    const found = data.find(
      (item) => item.monthYear === selectedMonth.replace("-0", "-")
    );
    return found || { transactions: [] };
  }, [data, selectedMonth]);

  const uniqueDays = useMemo(() => {
    return Array.from(
      new Set(
        filteredData.transactions.map((tx) => new Date(tx.createdAt).getDate())
      )
    ).sort((a, b) => a - b);
  }, [filteredData]);

  const filteredTransactions = useMemo(() => {
    if (selectedDate) {
      return filteredData.transactions.filter(
        (tx) => new Date(tx.createdAt).getDate() === parseInt(selectedDate, 10)
      );
    }
    return filteredData.transactions;
  }, [filteredData, selectedDate]);

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

    const wscols = [
      { wch: 30 }, // Title column width
      { wch: 15 }, // Amount column width
      { wch: 15 }, // Type column width
      { wch: 20 }, // Date column width
    ];

    worksheet["!cols"] = wscols;

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

    const dateStr = new Date().toISOString().slice(0, 10);
    XLSX.writeFile(workbook, `transactions-${dateStr}.xlsx`);
  };

  return (
    <div className="bg-white shadow-lg rounded-2xl border overflow-hidden">
      <div className="flex flex-wrap items-center justify-between p-4 border-b border-gray-200 bg-gray-50 gap-2">
        <input
          type="month"
          className="flex-1 sm:flex-grow-0 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          value={selectedMonth}
          max={getCurrentMonth()}
          onChange={(e) => setSelectedMonth(e.target.value)}
        />
        <button
          className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300 ease-in-out flex align-middle justify-center items-center gap-2"
          onClick={handleExport}
        >
          <CgSoftwareDownload className="w-6 h-6" />
          <div className="hidden sm:block">Export To Excel</div>
        </button>
        <select
          className="flex-1 sm:flex-grow-0 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        >
          <option value="">All Days</option>
          {uniqueDays.map((day) => (
            <option key={day} value={day}>
              {day}
            </option>
          ))}
        </select>
      </div>
      {filteredTransactions.length === 0 ? (
        <p className="text-center p-8 text-gray-500">
          No data available for the selected month.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <div className="lg:max-h-[calc(100vh-250px)] max-h-[70vh] overflow-y-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-100 sticky top-0">
                <tr>
                  {["Title", "Amount", "Type", "Action"].map((header) => (
                    <th
                      key={header}
                      className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredTransactions.map((tx) => (
                  <tr key={tx._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {tx.title}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {tx.amount}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          tx.type === "spent"
                            ? "bg-red-100 text-red-800"
                            : "bg-green-100 text-green-800"
                        }`}
                      >
                        {tx.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        className="text-red-600 hover:text-red-900 transition duration-150 ease-in-out"
                        onClick={() => onDeleteExpense(tx._id)}
                        aria-label={`Delete ${tx.title}`}
                      >
                        <FaTrashAlt />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
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
