import NavBar from "./NavBar";
import { Outlet } from "react-router-dom";
import "./layout.css";
import { useState } from "react";

const Layout = () => {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);

  return (
    <div className='flex flex-col min-h-screen dark:bg-gray-900 dark:text-white'>
      <NavBar
        isSidebarExpanded={isSidebarExpanded}
        setIsSidebarExpanded={setIsSidebarExpanded}
      />
      <main
        className={`flex-grow overflow-x-hidden overflow-y-auto ${
          isSidebarExpanded ? "md:ml-64" : "md:ml-12"
        }`}
      >
        <div className='max-w-full h-full'>
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Layout;
