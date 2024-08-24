import { Link } from "react-router-dom";
import { FaExclamationTriangle, FaHome, FaSignInAlt } from "react-icons/fa";
import { useEffect, useState } from "react";

const PageNotFound = () => {
  const [hasToken, setHasToken] = useState(false);

  useEffect(() => {
    // Check if token exists in localStorage
    const token = localStorage.getItem("token");
    setHasToken(!!token);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-blue-300 flex items-center justify-center px-4 py-8">
      <div className="max-w-lg w-full bg-white rounded-lg shadow-xl p-8 text-center">
        <FaExclamationTriangle className="text-yellow-400 text-6xl mx-auto mb-6 animate-bounce" />
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Oops! Page Not Found
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          The page {"you're"} looking for {"doesn't"} exist or has been moved.
        </p>
        <div className="space-y-4">
          <Link
            to={hasToken ? "/" : "/login"}
            className="inline-flex items-center justify-center w-full px-5 py-3 text-base font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-300"
          >
            {hasToken ? (
              <>
                <FaHome className="mr-2" />
                Go to Home
              </>
            ) : (
              <>
                <FaSignInAlt className="mr-2" />
                Go to Login
              </>
            )}
          </Link>
          <p className="text-sm text-gray-500">
            If you think this is a mistake, please{" "}
            <a href="#" className="text-blue-600 hover:underline">
              contact support
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
};

export default PageNotFound;
