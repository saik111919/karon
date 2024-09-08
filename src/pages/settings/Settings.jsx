import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiSettings, FiUser, FiBell, FiMoon, FiSun } from "react-icons/fi";
import HoverableName from "./HoverableName";
import SettingsItem from "./SettingsItem";
import Logout from "../../plugin/Logout";
import AlertModal from "../../component/AlertModal";
import useTheme from "../../hooks/useTheme";

const Settings = () => {
  const navigate = useNavigate();
  const [name, setName] = useState(localStorage.getItem("name") || "");
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [theme, toggleTheme] = useTheme();
  const darkMode = theme === "dark";

  useEffect(() => {
    // Ensure the theme is applied correctly on initial load
    const isDarkMode = localStorage.getItem("theme") === "dark";
    document.documentElement.classList.toggle("dark", isDarkMode);
  }, []);

  const handleNameChange = (newName) => {
    setName(newName);
    localStorage.setItem("name", newName);
  };

  const toggleDarkMode = () => {
    const newTheme = darkMode ? "light" : "dark";
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
    toggleTheme();
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className='min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center p-4 transition-colors duration-300'>
      <div className='w-full max-w-lg sm:max-w-xl md:max-w-2xl bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden flex flex-col'>
        <div className='bg-blue-500 dark:bg-blue-700 p-6 sm:p-8'>
          <div className='flex justify-between items-center'>
            <h1 className='text-2xl sm:text-3xl md:text-4xl font-bold text-white'>
              Settings
            </h1>
            <FiSettings className='h-7 w-7 text-white transition-transform duration-300 ease-in-out transform hover:rotate-180' />
          </div>
          <div className='mt-6'>
            <HoverableName
              name={name}
              onNameChange={handleNameChange}
              className='text-xl sm:text-2xl md:text-3xl text-white font-semibold'
            />
          </div>
        </div>

        <div className='flex-grow overflow-y-auto'>
          <div className='divide-y divide-gray-300 dark:divide-gray-700'>
            <SettingsItem
              icon={
                <FiUser className='h-6 w-6 text-gray-600 dark:text-gray-300' />
              }
              title='Account'
              description='Manage your account settings'
              onClick={() => console.log("Account settings clicked")}
            />
            <SettingsItem
              icon={
                <FiBell className='h-6 w-6 text-gray-600 dark:text-gray-300' />
              }
              title='Notifications'
              description='Configure your notification preferences'
              onClick={() => console.log("Notifications settings clicked")}
            />
            <SettingsItem
              icon={
                darkMode ? (
                  <FiSun className='h-6 w-6 text-gray-600 dark:text-gray-300' />
                ) : (
                  <FiMoon className='h-6 w-6 text-gray-600 dark:text-gray-300' />
                )
              }
              title='Appearance'
              description={`Switch to ${darkMode ? "light" : "dark"} mode`}
              onClick={toggleDarkMode}
            />
          </div>
        </div>

        <div className='p-4 sm:p-6 bg-gray-50 dark:bg-gray-800'>
          <Logout
            tag='button'
            className='bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-6 rounded-lg w-full transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50'
            onClick={() => {
              setShowConfirmModal(true);
            }}
          >
            Log Out
          </Logout>
        </div>
      </div>
      <AlertModal
        isOpen={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        title='Confirm'
        message='Are you sure you want to log out?'
        type='warning'
        confirmText="Yes, I'm sure"
        onConfirm={() => {
          handleLogout();
        }}
      />
    </div>
  );
};

export default Settings;
