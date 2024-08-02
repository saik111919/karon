import { useState } from "react";
import PropTypes from "prop-types";
import ThemeComp from "../component/Theme/ThemeComp";
import { Link } from "react-router-dom";

const DropdownMenu = ({ isDarkTheme, toggleTheme }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => setIsOpen(!isOpen);

  const handleLogout = () => {
    sessionStorage.clear();
  };

  return (
    <div className='relative'>
      <button className='flex items-center p-3' onClick={handleToggle}>
        <img alt='User' className='rounded-full' height={28} width={28} />
        <span className='bg-inherit px-0.5'>Usename</span>
        <svg
          className={`w-4 h-4 ml-2 bi bi-chevron-down ${
            isOpen ? "rotate-180" : ""
          }`}
          xmlns='http://www.w3.org/2000/svg'
          width={16}
          height={16}
          fill='currentColor'
          viewBox='0 0 16 16'
        >
          <path
            fillRule='evenodd'
            d='M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708'
          />
        </svg>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          onMouseLeave={handleToggle}
          className='absolute right-0 mt-2 w-48 dark:bg-white border dark:border-gray-300 rounded shadow-lg'
        >
          <ul className='list-none bg-inherit'>
            <li className='p-3 hover:bg-blue-700 hover:cursor-pointer rounded'>
              <div className='flex justify-between align-middle'>
                <h6 className='bg-inherit dark:text-black self-center hover:text-white '>
                  Theme
                </h6>
                <ThemeComp
                  isDarkTheme={isDarkTheme}
                  toggleTheme={toggleTheme}
                />
              </div>
            </li>
            <li className='p-3 hover:bg-blue-700 hover:cursor-pointer rounded text-center'>
              <Link
                to='/karon/login'
                onClick={handleLogout}
                className='w-full px-2 py-1 font-bold text-white bg-red-500 rounded hover:bg-red-700'
              >
                Logout
              </Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

DropdownMenu.propTypes = {
  isDarkTheme: PropTypes.bool.isRequired,
  toggleTheme: PropTypes.func.isRequired,
};

export default DropdownMenu;
