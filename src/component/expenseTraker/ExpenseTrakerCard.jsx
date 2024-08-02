import Card from "../../modules/Card/Card";
import CardBody from "../../modules/Card/CardBody";
import CardHeader from "../../modules/Card/CardHeader";
import { FaCreditCard, FaMoneyBillAlt, FaRupeeSign } from "react-icons/fa";
import useExpenseTracker from "../../hooks/useExpenseTracker ";
import StatCard from "./StatCard";
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
    <>
      <LoaderComp />
      <Card className=' mt-2 bg-inherit border rounded-lg'>
        <CardHeader className='flex justify-between align-middle border-b rounded-t-lg'>
          <h3 className='self-center drop-shadow-lg px-3'>
            Expenses {selectedMonth && "for"} {selectedMonth}
          </h3>
          <div className='flex items-center'>
            <input
              type='month'
              value={selectedMonth}
              onChange={handleMonthChange}
              max={formattedLastMonth}
              className='bg-inherit border border-inherit rounded-tr-lg p-3 text-inherit placeholder-inherit focus:outline-none focus:ring-2 focus:ring-inherit transition-colors duration-200 ease-in-out'
              placeholder='Select month'
            />
          </div>
        </CardHeader>
        {transactions.length === 0 ? (
          <CardBody className='p-4 text-center'>
            <p className='text-lg font-medium text-gray-500'>
              No transactions available {selectedMonth && "for"} {selectedMonth}
              .
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
