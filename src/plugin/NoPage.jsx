import { Link } from "react-router-dom";

const NoPage = () => {
  const token = sessionStorage.getItem("token");

  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100'>
      <h1 className='text-6xl font-bold text-gray-800 mb-4'>404</h1>
      <p className='text-2xl text-gray-600 mb-8'>Page Not Found</p>
      {token ? (
        <Link
          to='/karon/'
          className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200'
        >
          Go to Homepage
        </Link>
      ) : (
        <Link
          to='/karon/login'
          className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200'
        >
          Go to Login
        </Link>
      )}
    </div>
  );
};

export default NoPage;
