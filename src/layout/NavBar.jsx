import { useState, useRef, useEffect } from "react";
import { NavLink } from "react-router-dom";
import logo from "../../icon.png";
import userAvatar from "../../icon.png";
import routes from "../routes/routes";
import { FaChartBar, FaCog, FaHome, FaUser } from "react-icons/fa";

const NavBar = () => {
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
      default:
        return null;
    }
  };

  return (
    <>
      {/* Navbar */}
      <nav className="bg-gray-800 shadow-sm sticky top-0 w-full z-50">
        <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <NavLink to="/" className="flex-shrink-0 flex items-center gap-2">
                <img className="h-8 w-8 rounded-lg" src={logo} alt="Logo" />
                <span className="text-xl font-semibold text-white">Karon</span>
              </NavLink>
            </div>
            <div className="flex items-center">
              <div className="ml-3 relative hidden md:block" ref={dropdownRef}>
                <button
                  className="max-w-xs bg-gray-800 rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
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
                  <span className="text-sm font-medium px-2 text-white">
                    {name}
                  </span>
                </button>
              </div>
              {isProfileOpen && (
                <div
                  className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-gray-700 ring-1 ring-black ring-opacity-5"
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
              <div className="ml-3 md:hidden">
                <button
                  onClick={toggleSidebar}
                  type="button"
                  className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                  aria-controls="mobile-menu"
                  aria-expanded="false"
                >
                  <span className="sr-only">Open main menu</span>
                  {!isSidebarOpen ? (
                    <svg
                      className="block h-6 w-6"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 6h16M4 12h16M4 18h16"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="block h-6 w-6"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Sidebar */}
      <aside
        className={`bg-gray-800 text-white w-64 min-h-screen fixed top-16 left-0 z-40 transform transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        <div className="p-4">
          <nav className="flex flex-col gap-2">
            {routes.map(
              ({ path, name, isHeader = true }, index) =>
                isHeader && (
                  <NavLink
                    key={index}
                    to={path}
                    className={({ isActive }) =>
                      `flex py-2 px-4 rounded transition duration-200 gap-2 ${
                        isActive
                          ? "bg-gray-700 text-white"
                          : "text-gray-400 hover:bg-gray-700 hover:text-white"
                      }`
                    }
                    onClick={() => setIsSidebarOpen(false)}
                  >
                    <span className="self-center">{getIcon(name)}</span>
                    {name}
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

export default NavBar;
