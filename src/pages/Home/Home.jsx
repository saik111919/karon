import ExpenseTrackerCard from "../../component/expense/ExpenseTrackerCard";

const Home = () => {
  return (
    <div className='min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500'>
      <div className='container mx-auto px-4 py-12'>
        <header className='text-center mb-12'>
          <h1 className='text-4xl sm:text-5xl md:text-6xl font-extrabold text-white mb-4 drop-shadow-lg'>
            Expense Tracker
          </h1>
          <p className='text-xl sm:text-2xl text-white opacity-80'>
            Manage your finances with ease
          </p>
        </header>

        <div className='max-w-4xl mx-auto bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-3xl shadow-2xl overflow-hidden'>
          <ExpenseTrackerCard />
        </div>
      </div>
    </div>
  );
};

export default Home;
