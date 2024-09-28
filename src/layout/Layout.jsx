import NavBar from "./NavBar";
import { Outlet } from "react-router-dom";
import "./layout.css";
import { useState } from "react";
import BottomBar from "./BottomBar";
import routes from "../routes/routes";
import { Cog, Home, User, Video } from "lucide-react";

const Layout = () => {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);

  const getIcon = (name) => {
    switch (name.toLowerCase()) {
      case "home":
        return <Home />;
      case "profile":
        return <User />;
      case "settings":
        return <Cog />;
      case "video":
        return <Video />;
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col max-h-screen dark:bg-gray-900 dark:text-white">
      <NavBar
        isSidebarExpanded={isSidebarExpanded}
        setIsSidebarExpanded={setIsSidebarExpanded}
        getIcon={getIcon}
      />
      <main
        className={`flex-grow overflow-x-hidden overflow-y-auto h-screen ${
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
