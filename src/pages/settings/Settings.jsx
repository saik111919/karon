import Logout from "../../plugin/Logout";
import { FiSettings } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import HoverableName from "./HoverableName";

const Settings = () => {
  const navigate = useNavigate();
  const getName = localStorage.getItem("name");

  const [name, setName] = useState(getName);

  const handleNameChange = (newName) => {
    setName(newName);
  };

  return (
    <div className='-m-1'>
      <div className='flex flex-col justify-between'>
        <div className='w-full p-4 flex justify-between shadow-sm'>
          <h1 className='text-2xl font-mono'>Settings</h1>
          <HoverableName name={name} onNameChange={handleNameChange} />
          <FiSettings className='h-7 w-7 transition-transform duration-300 ease-in-out transform hover:rotate-180 hover:text-blue-500' />
        </div>
        <div className='w-full'>
          <Logout
            tag='button'
            className='bg-danger p-3 text-light w-full'
            onClick={() => {
              localStorage.clear();
              navigate("/login");
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Settings;
