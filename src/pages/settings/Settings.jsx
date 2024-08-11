import PropTypes from "prop-types";
import Logout from "../../plugin/Logout";
import {
  FiSettings,
  FiUser,
  FiBell,
  FiLock,
  FiHelpCircle,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import HoverableName from "./HoverableName";

const SettingsItem = ({ icon, title, description, onClick }) => (
  <div
    className='flex items-center p-4 hover:bg-gray-100 cursor-pointer transition duration-300 ease-in-out'
    onClick={onClick}
  >
    <div className='mr-4 text-indigo-600'>{icon}</div>
    <div>
      <h3 className='font-semibold text-gray-800'>{title}</h3>
      <p className='text-sm text-gray-600'>{description}</p>
    </div>
  </div>
);

SettingsItem.propTypes = {
  icon: PropTypes.element.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

const Settings = () => {
  const navigate = useNavigate();
  const getName = localStorage.getItem("name");
  const [name, setName] = useState(getName);

  const handleNameChange = (newName) => {
    setName(newName);
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center px-4 sm:px-6 lg:px-8'>
      <div className='w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl xl:max-w-3xl bg-white shadow-2xl rounded-2xl overflow-hidden flex flex-col'>
        <div className='bg-gradient-to-r from-indigo-600 to-purple-600 p-6 sm:p-8'>
          <div className='flex justify-between items-center'>
            <h1 className='text-2xl sm:text-3xl font-bold text-white'>
              Settings
            </h1>
            <FiSettings className='h-7 w-7 text-white transition-transform duration-300 ease-in-out transform hover:rotate-180' />
          </div>
          <div className='mt-4'>
            <HoverableName
              name={name}
              onNameChange={handleNameChange}
              className='text-xl sm:text-2xl text-white font-semibold'
            />
          </div>
        </div>

        <div className='flex-grow overflow-y-auto'>
          <div className='divide-y divide-gray-200'>
            <SettingsItem
              icon={<FiUser className='h-6 w-6' />}
              title='Account'
              description='Manage your account settings'
              onClick={() => console.log("Account settings clicked")}
            />
            <SettingsItem
              icon={<FiBell className='h-6 w-6' />}
              title='Notifications'
              description='Configure your notification preferences'
              onClick={() => console.log("Notifications settings clicked")}
            />
            <SettingsItem
              icon={<FiLock className='h-6 w-6' />}
              title='Privacy'
              description='Control your privacy settings'
              onClick={() => console.log("Privacy settings clicked")}
            />
            <SettingsItem
              icon={<FiHelpCircle className='h-6 w-6' />}
              title='Help & Support'
              description='Get help or contact support'
              onClick={() => console.log("Help & Support clicked")}
            />
          </div>
        </div>

        <div className='p-4 sm:p-6'>
          <Logout
            tag='button'
            className='bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-6 rounded-full w-full transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50'
            onClick={handleLogout}
          >
            Log Out
          </Logout>
        </div>
      </div>
    </div>
  );
};

export default Settings;
