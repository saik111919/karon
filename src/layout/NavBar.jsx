import { useState, useRef, useEffect } from "react";
import { NavLink } from "react-router-dom";
import logo from "../../icon.png";
import userAvatar from "../../icon.png";
import routes from "../routes/routes";
import PropTypes from "prop-types";

import {
  FaChartBar,
  FaChevronLeft,
  FaChevronRight,
  FaCog,
  FaHome,
  FaUser,
  FaBars,
} from "react-icons/fa";
import { BiDevices } from "react-icons/bi";
import { CgClose } from "react-icons/cg";

const NavBar = ({ isSidebarExpanded, setIsSidebarExpanded }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const dropdownRef = useRef(null);
  const name = localStorage.getItem("name");

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    localStorage.clear();
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const getIcon = (name) => {
    switch (name.toLowerCase()) {
      case "home":
        return <FaHome />;
      case "profile":
        return <FaUser />;
      case "settings":
        return <FaCog />;
      case "dashboard":
        return <FaChartBar />;
      case "device status":
        return <BiDevices />;
      default:
        return null;
    }
  };

  const toggleSidebarExpand = () => {
    setIsSidebarExpanded((prev) => !prev);
  };

  return (
    <>
      {/* Navbar */}
      <nav className="bg-gray-800 shadow-sm sticky top-0 w-full z-50">
        <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <NavLink
                to="/"
                className="flex-shrink-0 flex items-center gap-2 ml-4"
              >
                <img className="h-8 w-8 rounded-lg" src={logo} alt="Logo" />
                <span className="text-xl font-semibold text-white">Karon</span>
              </NavLink>
            </div>
            <div className="flex items-center">
              <div className="ml-3 relative" ref={dropdownRef}>
                <button
                  className="max-w-xs bg-gray-800 rounded-full lg:flex hidden items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                  id="user-menu"
                  aria-haspopup="true"
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                >
                  <span className="sr-only">Open user menu</span>
                  <img
                    className="h-8 w-8 rounded-full"
                    src={userAvatar}
                    alt="User avatar"
                  />
                  <span className="text-sm font-medium px-2 text-white hidden md:inline">
                    {name}
                  </span>
                </button>

                <button
                  onClick={toggleSidebar}
                  className="text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white md:hidden rounded p-2"
                >
                  {isSidebarOpen ? <CgClose /> : <FaBars className="h-6 w-6" />}
                </button>
              </div>
              {isProfileOpen && (
                <div
                  className="origin-top-right absolute top-12 right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-gray-700 ring-1 ring-black ring-opacity-5"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="user-menu"
                >
                  <NavLink
                    to="/login"
                    onClick={handleLogout}
                    className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-600 hover:text-white"
                    role="menuitem"
                  >
                    Logout
                  </NavLink>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Sidebar */}
      <aside
        className={`bg-gray-800 text-white min-h-screen fixed top-16 left-0 z-40 transition-all duration-300 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 ${isSidebarExpanded ? "lg:w-64 w-full" : "w-16"}`}
      >
        <div
          className={`h-full flex flex-col ${
            isSidebarExpanded ? " p-4" : "p-2"
          }`}
        >
          <nav className="flex flex-col gap-2 flex-grow">
            <button
              onClick={toggleSidebarExpand}
              className="self-center mb-4 bg-gray-700 text-white p-2 rounded-full hidden md:block"
            >
              {isSidebarExpanded ? <FaChevronLeft /> : <FaChevronRight />}
            </button>
            {routes.map(
              ({ path, name, isHeader = true }, index) =>
                isHeader && (
                  <NavLink
                    key={index}
                    to={path}
                    className={({ isActive }) =>
                      `flex items-center ${
                        isSidebarExpanded ? "py-3 px-4" : "p-2 px-3"
                      } transition duration-200 ${
                        isActive
                          ? `bg-gray-700 text-white ${
                              isSidebarExpanded ? "rounded-lg" : "rounded"
                            }`
                          : "text-gray-400 hover:bg-gray-700 hover:text-white rounded"
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
                    {isSidebarExpanded && <span className="ml-3">{name}</span>}
                  </NavLink>
                )
            )}
          </nav>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-30 md:hidden"
          onClick={toggleSidebar}
        ></div>
      )}
    </>
  );
};

NavBar.propTypes = {
  isSidebarExpanded: PropTypes.bool,
  setIsSidebarExpanded: PropTypes.func,
};

export default NavBar;
