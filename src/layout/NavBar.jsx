import { useState, useRef, useEffect } from "react";
import { NavLink } from "react-router-dom";
import logo from "../../icon.png";
import userAvatar from "../../icon.png"; // Make sure to add this image to your project
import routes from "../routes/routes";

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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

  return (
    <nav className="bg-blue-600 shadow-lg sticky top-0 w-full z-50">
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-">
        <div className="flex items-center justify-between lg:h-12 h-14">
          <div className="flex items-center">
            <NavLink to="/" className="flex-shrink-0 flex items-center gap-2">
              <img className="h-8 w-8 rounded-lg" src={logo} alt="Logo" />
              <span className="text-xl font-semibold lg:hidden block text-white">
                Karon
              </span>
            </NavLink>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                {routes.map(
                  ({ path, name, isHeader = true }, index) =>
                    isHeader && (
                      <NavLink
                        key={index}
                        to={path}
                        className={({ isActive }) =>
                          `px-3 py-2 rounded-md text-sm font-medium ${
                            isActive
                              ? "bg-blue-700 text-white"
                              : "text-blue-200 hover:bg-blue-700 hover:text-white"
                          }`
                        }
                      >
                        {name}
                      </NavLink>
                    )
                )}
              </div>
            </div>
          </div>
          <div className="flex items-center">
            <div className="ml-3 relative hidden lg:block" ref={dropdownRef}>
              <div>
                <button
                  className="max-w-xs bg-blue-600 rounded-lg flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-blue-800 focus:ring-white"
                  id="user-menu"
                  aria-haspopup="true"
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                >
                  <span className="sr-only">Open user menu</span>
                  <img
                    className="h-8 w-8 rounded-lg"
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
                  className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="user-menu"
                >
                  <NavLink
                    to="/login"
                    onClick={handleLogout}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-700 hover:text-white w-full text-left rounded-md"
                    role="menuitem"
                  >
                    Logout
                  </NavLink>
                </div>
              )}
            </div>
            <div className="-mr-2 flex md:hidden ml-3">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                type="button"
                className="bg-blue-700 inline-flex items-center justify-center p-2 rounded-md text-blue-200 hover:text-white hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-blue-800 focus:ring-white"
                aria-controls="mobile-menu"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                {!isMenuOpen ? (
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

      {isMenuOpen && (
        <div className="md:hidden" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {routes.map(
              ({ path, name, isHeader = true }, index) =>
                isHeader && (
                  <NavLink
                    key={index}
                    to={path}
                    className={({ isActive }) =>
                      `block px-3 py-2 rounded-md text-base font-medium ${
                        isActive
                          ? "bg-blue-700 text-white"
                          : "text-blue-200 hover:bg-blue-700 hover:text-white"
                      }`
                    }
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {name}
                  </NavLink>
                )
            )}
            <NavLink
              to="/login"
              onClick={handleLogout}
              className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-blue-200 hover:bg-blue-700 hover:text-white"
            >
              Logout
            </NavLink>
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
