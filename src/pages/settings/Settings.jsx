import { FiSettings, FiUser, FiBell } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import HoverableName from "./HoverableName";
import SettingsItem from "./SettingsItem";
import Logout from "../../plugin/Logout";

const Settings = () => {
  const navigate = useNavigate();
  const getName = localStorage.getItem("name");
  const [name, setName] = useState(getName || ""); // Ensure default value if null

  const handleNameChange = (newName) => {
    setName(newName);
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className='min-h-screen bg-gradient-to-r from-blue-100 to-purple-200 flex items-center justify-center p-4'>
      <div className='w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl bg-white shadow-lg rounded-lg overflow-hidden flex flex-col'>
        <div className='bg-gradient-to-r from-blue-600 to-purple-600 p-6 sm:p-8'>
          <div className='flex justify-between items-center'>
            <h1 className='text-xl sm:text-2xl md:text-3xl font-bold text-white'>
              Settings
            </h1>
            <FiSettings className='h-6 w-6 text-white transition-transform duration-300 ease-in-out transform hover:scale-110' />
          </div>
          <div className='mt-4'>
            <HoverableName
              name={name}
              onNameChange={handleNameChange}
              className='text-lg sm:text-xl md:text-2xl text-white font-semibold'
            />
          </div>
        </div>

        <div className='flex-grow overflow-y-auto bg-gray-50'>
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
          </div>
        </div>

        <div className='p-4 sm:p-6 bg-gray-100'>
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
