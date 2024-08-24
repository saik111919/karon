import { NavLink } from "react-router-dom";
import routes from "../routes/routes";
import { useState } from "react";
import { BiLogOut, BiUserCircle, BiMenu, BiX } from "react-icons/bi";
import { FaHome, FaChartBar, FaWallet, FaCog } from "react-icons/fa";

const NavBar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const userName = localStorage.getItem("name");

  const toggleDropdown = () => setIsDropdownOpen((prev) => !prev);
  const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev);

  const getIcon = (name) => {
    switch (name) {
      case "Home":
        return <FaHome />;
      case "Analytics":
        return <FaChartBar />;
      case "Transactions":
        return <FaWallet />;
      case "Settings":
        return <FaCog />;
      default:
        return null;
    }
  };

  return (
    <nav className='bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-lg w-full '>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex h-16'>
          <div className='flex items-center'>
            <NavLink to='/' className='flex-shrink-0 flex items-center'>
              <h1 className='text-2xl font-bold'>KARON</h1>
            </NavLink>
          </div>

          {/* Desktop menu */}
          <div className='hidden md:flex items-center'>
            <div className='ml-10 flex items-baseline space-x-4'>
              {routes.map(
                (route, index) =>
                  route.isHeader && (
                    <NavLink
                      key={index}
                      to={route.path}
                      className={({ isActive }) =>
                        `flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                          isActive
                            ? "bg-blue-700 text-white"
                            : "text-blue-100 hover:bg-blue-700 hover:text-white"
                        }`
                      }
                    >
                      {getIcon(route.name)}
                      <span className='ml-2'>{route.name}</span>
                    </NavLink>
                  )
              )}
            </div>
          </div>

          {/* User menu */}
          <div className='hidden md:flex items-center ms-auto'>
            <div className='ml-3 relative'>
              <button
                onClick={toggleDropdown}
                className='flex items-center space-x-2 bg-blue-700 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 hover:bg-blue-600'
              >
                <BiUserCircle className='text-xl' />
                <span>{userName ? userName : "Username"}</span>
              </button>

              {isDropdownOpen && (
                <div className='origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5'>
                  <NavLink
                    to='/login'
                    className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
                    onClick={() => {
                      localStorage.clear();
                      setIsDropdownOpen(false);
                    }}
                  >
                    <div className='flex items-center'>
                      <BiLogOut className='mr-2' />
                      Logout
                    </div>
                  </NavLink>
                </div>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className='md:hidden flex items-center ms-auto'>
            <button
              onClick={toggleMobileMenu}
              className='inline-flex items-center justify-center p-2 rounded-md text-blue-100 hover:text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white focus:rounded-2xl'
            >
              {isMobileMenuOpen ? (
                <BiX className='text-2xl' />
              ) : (
                <BiMenu className='text-2xl' />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className='md:hidden'>
          <div className='px-2 pt-2 pb-3 space-y-1 sm:px-3'>
            {routes.map(
              (route, index) =>
                route.isHeader && (
                  <NavLink
                    key={index}
                    to={route.path}
                    className={({ isActive }) =>
                      `block px-3 py-2 rounded-md text-base font-medium ${
                        isActive
                          ? "bg-blue-700 text-white"
                          : "text-blue-100 hover:bg-blue-700 hover:text-white"
                      }`
                    }
                    onClick={toggleMobileMenu}
                  >
                    <div className='flex items-center'>
                      {getIcon(route.name)}
                      <span className='ml-2'>{route.name}</span>
                    </div>
                  </NavLink>
                )
            )}
            <NavLink
              to='/login'
              className='block px-3 py-2 rounded-md text-base font-medium text-blue-100 hover:bg-blue-700 hover:text-white'
              onClick={() => {
                localStorage.clear();
                toggleMobileMenu();
              }}
            >
              <div className='flex items-center'>
                <BiLogOut className='mr-2' />
                Logout
              </div>
            </NavLink>
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
