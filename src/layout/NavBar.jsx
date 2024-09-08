import { useState } from "react";
import { NavLink } from "react-router-dom";
import logo from "../../icon.png";
import userAvatar from "../../icon.png";
import routes from "../routes/routes";
import PropTypes from "prop-types";
import { FaChevronLeft, FaChevronRight, FaMoon, FaSun } from "react-icons/fa";
import { BiLogOut } from "react-icons/bi";
import useTheme from "../hooks/useTheme";

const NavBar = ({ isSidebarExpanded, setIsSidebarExpanded, getIcon }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const name = localStorage.getItem("name");
  const [theme, toggleTheme] = useTheme();

  const toggleSidebarExpand = () => {
    setIsSidebarExpanded((prev) => !prev);
  };

  return (
    <>
      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-40 h-screen transition-all duration-300 ease-in-out shadow-xl hidden md:hidden lg:flex flex-col 
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} 
          md:translate-x-0 
          ${
            isSidebarExpanded ? "lg:w-72 w-full" : "w-20"
          } dark:bg-gray-900 bg-gray-50 text-gray-800 dark:text-white`}
      >
        <div className={`flex-grow ${isSidebarExpanded ? "p-6" : "p-2"}`}>
          <div
            className={`flex items-center border-b border-gray-200 dark:border-gray-700 pb-4 justify-${
              isSidebarExpanded ? "between" : "center"
            }`}
          >
            {isSidebarExpanded && (
              <NavLink to='/' className='flex-shrink-0 flex items-center gap-3'>
                <img className='h-10 w-10 rounded-xl' src={logo} alt='Logo' />
                <span className='text-2xl font-bold text-gray-800 dark:text-white'>
                  Karon
                </span>
              </NavLink>
            )}
            <button
              onClick={toggleSidebarExpand}
              className='self-center bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 p-2 rounded-full hidden md:block hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200'
            >
              {isSidebarExpanded ? <FaChevronLeft /> : <FaChevronRight />}
            </button>
          </div>
          <nav className='flex flex-col gap-2 mt-6'>
            {routes.map(
              ({ path, name, isHeader = true }, index) =>
                isHeader && (
                  <NavLink
                    key={index}
                    to={path}
                    className={({ isActive }) =>
                      `flex items-center ${
                        isSidebarExpanded ? "py-3 px-4" : "p-3"
                      } transition duration-200 ${
                        isActive
                          ? "bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 rounded-xl font-semibold"
                          : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white rounded-xl"
                      } ${isSidebarExpanded ? "" : "justify-center"}`
                    }
                    onClick={() => setIsSidebarOpen(false)}
                  >
                    <span
                      className={`text-xl ${
                        isSidebarExpanded ? "" : "w-16 flex justify-center"
                      }`}
                    >
                      {getIcon(name)}
                    </span>
                    {isSidebarExpanded && (
                      <span className='ml-3 text-sm'>{name}</span>
                    )}
                  </NavLink>
                )
            )}
          </nav>
        </div>
        <div className='border-t border-gray-200 dark:border-gray-700 mt-auto'>
          <div className={`p-4 ${isSidebarExpanded ? "px-6" : "px-2"}`}>
            {isSidebarExpanded ? (
              <div className='flex items-center mb-4 bg-gray-100 dark:bg-gray-800 p-3 rounded-lg'>
                <img
                  src={userAvatar}
                  alt='User Avatar'
                  className='w-10 h-10 rounded-full mr-3 border-2 border-white dark:border-gray-700 shadow-md'
                />
                <span className='text-sm font-medium truncate'>{name}</span>
              </div>
            ) : (
              <div className='flex justify-center mb-4'>
                <img
                  src={userAvatar}
                  alt='User Avatar'
                  className='w-10 h-10 rounded-full border-2 border-white dark:border-gray-700 shadow-md'
                />
              </div>
            )}

            <button
              className={`w-full flex items-center justify-center p-2 mb-3 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 rounded-lg transition-colors duration-200`}
              onClick={toggleTheme}
            >
              {theme === "dark" ? (
                <FaSun
                  className={`${
                    isSidebarExpanded ? "h-5 w-5 mr-2" : "h-6 w-6"
                  }`}
                />
              ) : (
                <FaMoon
                  className={`${
                    isSidebarExpanded ? "h-5 w-5 mr-2" : "h-6 w-6"
                  }`}
                />
              )}
              {isSidebarExpanded && (
                <span className='text-sm font-medium'>
                  {theme === "dark" ? "Light Mode" : "Dark Mode"}
                </span>
              )}
            </button>

            <NavLink
              to='login'
              className={({ isActive }) =>
                `w-full flex items-center justify-center p-2 transition-colors duration-200 ${
                  isActive
                    ? "bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-300"
                    : "bg-red-500 hover:bg-red-600 text-white"
                } rounded-lg font-medium`
              }
              onClick={() => {
                setIsSidebarOpen(false);
                localStorage.clear();
              }}
            >
              <BiLogOut
                className={`${isSidebarExpanded ? "text-xl mr-2" : "text-2xl"}`}
              />
              {isSidebarExpanded && <span className='text-sm'>Logout</span>}
            </NavLink>
          </div>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div
          className='fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden'
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}
    </>
  );
};

NavBar.propTypes = {
  isSidebarExpanded: PropTypes.bool,
  setIsSidebarExpanded: PropTypes.func.isRequired,
  getIcon: PropTypes.func.isRequired,
};

export default NavBar;
