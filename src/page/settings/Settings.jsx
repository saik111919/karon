import ThemeComp from "../../component/Theme/ThemeComp";
import useTheme from "../../hooks/useTheme";
import { useNavigate } from "react-router-dom"; // Assuming you use react-router for navigation

const Settings = () => {
  const [isDarkTheme, toggleTheme] = useTheme();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className='flex flex-col items-center p-6 space-y-6'>
      <h1 className='text-2xl font-bold '>Settings</h1>
      <ul className='w-full max-w-md'>
        <li className='mb-4'>
          <div className='flex justify-between flex-wrap'>
            <span className='text-inherit text-lg '>Theme</span>
            <div>
              <ThemeComp isDarkTheme={isDarkTheme} toggleTheme={toggleTheme} />
            </div>
          </div>
        </li>
        <li>
          <button
            type='button'
            onClick={handleLogout}
            className='w-full px-4 py-2 font-bold text-white bg-red-500 rounded hover:bg-red-700'
          >
            Logout
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Settings;
