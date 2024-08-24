import ExpenseTrackerCard from "../../component/expense/ExpenseTrackerCard";
import { FaPiggyBank } from "react-icons/fa";

const Home = () => {
  return (
    <div className='min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 flex flex-col items-center'>
      <div className='container mx-auto px-4 py-8 md:py-10'>
        <header className='text-center mb-8 md:mb-16'>
          <h1 className='text-3xl sm:text-5xl md:text-6xl font-extrabold text-white mb-4 drop-shadow-xl'>
            <FaPiggyBank className='inline-block mr-2 text-white' />
            Expense Tracker
          </h1>
          <p className='text-lg sm:text-xl md:text-2xl text-white opacity-90'>
            Effortlessly manage your finances
          </p>
        </header>

        <div className='w-full max-w-4xl mx-auto bg-white bg-opacity-20 backdrop-filter backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden'>
          <ExpenseTrackerCard />
        </div>
      </div>
    </div>
  );
};

export default Home;
