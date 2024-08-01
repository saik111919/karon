import { useState } from "react";
import Card from "../../modules/Card/Card";
import CardBody from "../../modules/Card/CardBody";
import CardHeader from "../../modules/Card/CardHeader";
import {
  //   FaCalendarAlt,
  FaCreditCard,
  FaMoneyBillAlt,
  FaRupeeSign,
} from "react-icons/fa";

const ExpenseTrackerCard = () => {
  const [data] = useState([
    {
      monthYear: "2024-07",
      transactions: [
        {
          _id: "6693b3bb8115220860180894",
          createdAt: "2024-07-14T11:17:15.806Z",
          type: "spent",
          amount: 2950,
          title: "iPhone emi",
        },
        {
          _id: "6693b3c48115220860180897",
          createdAt: "2024-07-14T11:17:24.741Z",
          type: "spent",
          amount: 6000,
          title: "Pixel emi",
        },
        {
          _id: "6693b3d4811522086018089a",
          createdAt: "2024-07-14T11:17:40.961Z",
          type: "spent",
          amount: 2500,
          title: "Credit bill",
        },
      ],
    },
    {
      monthYear: "2024-08",
      transactions: [
        {
          _id: "66aaacb2746e44b9142c2fb6",
          createdAt: "2024-07-31T21:29:22.325Z",
          type: "spent",
          amount: 47,
          title: "🥛🥛🥛🥛🥛",
        },
        {
          _id: "66aaacdd746e44b9142c2fbb",
          createdAt: "2024-07-31T21:30:05.056Z",
          type: "credited",
          amount: 38173,
          title: "Salary",
        },
        {
          _id: "66aaad19746e44b9142c2fc0",
          createdAt: "2024-07-31T21:31:05.790Z",
          type: "spent",
          amount: 50,
          title: "Dinner 🍽️🍽️🍽️",
        },
      ],
    },
  ]);

  // Convert the month to YYYY-MM format
  const formatMonth = (month) => {
    const [year, monthNum] = month.split("-");
    return `${year}-${monthNum.padStart(2, "0")}`;
  };

  const lastMonthData =
    data.length > 0 ? data[data.length - 1].monthYear : "2024-01";
  const formattedLastMonth = formatMonth(lastMonthData);

  const [selectedMonth, setSelectedMonth] = useState(formattedLastMonth);

  const handleMonthChange = (e) => {
    setSelectedMonth(e.target.value);
  };

  // Filter data based on selected month
  const filteredData = data.find(
    (item) => formatMonth(item.monthYear) === selectedMonth
  ) || { transactions: [] };

  const transactions = filteredData.transactions;

  const totalSpent = transactions
    .filter((transaction) => transaction.type === "spent")
    .reduce((sum, transaction) => sum + transaction.amount, 0);

  const totalCredited = transactions
    .filter((transaction) => transaction.type === "credited")
    .reduce((sum, transaction) => sum + transaction.amount, 0);

  const remainingAmount = totalCredited - totalSpent;

  return (
    <Card className={"pb-1"}>
      <CardHeader
        className={"lg:p-3 p-1 px-2 flex justify-between align-middle"}
      >
        <h3 className='self-center'>Expenses for {selectedMonth}</h3>
        <div className='flex items-center'>
          <input
            type='month'
            value={selectedMonth}
            onChange={handleMonthChange}
            max={formattedLastMonth}
            className='
              bg-transparent 
              border 
              border-inherit
              rounded-lg 
              p-2
              text-inherit 
              placeholder-inherit 
              focus:outline-none 
              focus:ring-2 
              focus:ring-inherit
              transition-colors 
              duration-200 
              ease-in-out 
            '
            placeholder='Select month'
          />
          {/* <FaCalendarAlt className='absolute right-3 top-1/2 transform -translate-y-1/2 text-indigo-200 dark:text-white' /> */}
        </div>
      </CardHeader>
      {transactions.length === 0 ? (
        <CardBody className='p-4 text-center'>
          <p className='text-lg font-medium text-gray-500'>
            No transactions available for {selectedMonth}.
          </p>
        </CardBody>
      ) : (
        <CardBody className='flex flex-wrap gap-4 m-2'>
          <Card className='flex-1 min-w-[150px] bg-inherit border rounded-lg shadow-md'>
            <CardBody className='p-4 flex items-center justify-between'>
              <div className='flex flex-col text-left'>
                <span className='text-lg font-medium'>Spent</span>
                <span className='text-xl font-bold'>{totalSpent}₹</span>
              </div>
              <FaRupeeSign className='text-green-500 text-2xl' />
            </CardBody>
          </Card>
          <Card className='flex-1 min-w-[150px] bg-inherit border rounded-lg shadow-md'>
            <CardBody className='p-4 flex items-center justify-between'>
              <div className='flex flex-col text-left'>
                <span className='text-lg font-medium'>Credited</span>
                <span className='text-xl font-bold'>{totalCredited}₹</span>
              </div>
              <FaCreditCard className='text-blue-500 text-2xl' />
            </CardBody>
          </Card>
          <Card className='flex-1 min-w-[150px] bg-inherit border rounded-lg shadow-md'>
            <CardBody className='p-4 flex items-center justify-between'>
              <div className='flex flex-col text-left'>
                <span className='text-lg font-medium'>Remaining Amount</span>
                <span className='text-xl font-bold'>{remainingAmount}₹</span>
              </div>
              <FaMoneyBillAlt className='text-red-500 text-2xl' />
            </CardBody>
          </Card>
        </CardBody>
      )}
    </Card>
  );
};

export default ExpenseTrackerCard;
