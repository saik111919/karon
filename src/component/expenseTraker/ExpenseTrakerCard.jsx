import { useEffect, useState } from "react";
// import useExpenseTracker from "../../hooks/useExpenseTracker";
import Card from "../../modules/Card/Card";
import CardBody from "../../modules/Card/CardBody";
import CardHeader from "../../modules/Card/CardHeader";
import { FaCreditCard, FaMoneyBillAlt, FaRupeeSign } from "react-icons/fa";
import { GetTransactions } from "../../services/services";
import useLoader from "../../hooks/useLoader";
import useExpenseTracker from "../../hooks/useExpenseTracker ";
import StatCard from "./StatCard";

const ExpenseTrackerCard = () => {
  const [data, setData] = useState([]);
  const [setLoader, LoaderComp] = useLoader(false);

  const fetchTransactions = async () => {
    try {
      setLoader(true);
      const { data } = await GetTransactions();
      setData(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

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
    <>
      <LoaderComp />
      <Card className='pb-1 mt-2'>
        <CardHeader className='lg:p-3 p-1 px-2 flex justify-between align-middle'>
          <h3 className='self-center drop-shadow-lg'>
            Expenses for {selectedMonth}
          </h3>
          <div className='flex items-center'>
            <input
              type='month'
              value={selectedMonth}
              onChange={handleMonthChange}
              max={formattedLastMonth}
              className='bg-transparent border border-inherit rounded-lg p-2 text-inherit placeholder-inherit focus:outline-none focus:ring-2 focus:ring-inherit transition-colors duration-200 ease-in-out'
              placeholder='Select month'
            />
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
            <StatCard
              title='Spent'
              value={totalSpent}
              icon={FaRupeeSign}
              iconColor='text-green-500'
            />
            <StatCard
              title='Credited'
              value={totalCredited}
              icon={FaCreditCard}
              iconColor='text-blue-500'
            />
            <StatCard
              title='Remaining Amount'
              value={remainingAmount}
              icon={FaMoneyBillAlt}
              iconColor='text-red-500'
            />
          </CardBody>
        )}
      </Card>
    </>
  );
};

export default ExpenseTrackerCard;
