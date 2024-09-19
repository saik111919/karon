import NavBar from "./NavBar";
import { Outlet } from "react-router-dom";
import "./layout.css";
import { useState } from "react";
import useTheme from "../hooks/useTheme";
import BottomBar from "./BottomBar";
import routes from "../routes/routes";
import { FaCog, FaHome, FaUser } from "react-icons/fa";

const Layout = () => {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);
  const [theme, toggleTheme] = useTheme();

  const getIcon = (name) => {
    switch (name.toLowerCase()) {
      case "home":
        return <FaHome />;
      case "profile":
        return <FaUser />;
      case "settings":
        return <FaCog />;
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col max-h-screen dark:bg-gray-900 dark:text-white">
      <NavBar
        isSidebarExpanded={isSidebarExpanded}
        setIsSidebarExpanded={setIsSidebarExpanded}
        toggleTheme={toggleTheme}
        getIcon={getIcon}
        theme={theme}
      />
      <main
        className={`flex-grow overflow-x-hidden overflow-y-auto ${
          isSidebarExpanded ? "lg:ml-72" : "lg:ml-16"
        }`}
      >
        <div className="max-w-full h-full">
          <Outlet />
        </div>
      </main>

      <BottomBar routes={routes} getIcon={getIcon} />
    </div>
  );
};

export default Layout;
