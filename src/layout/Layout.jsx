import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import "./layout.css";

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <NavBar />
      <main className="flex-grow overflow-x-hidden overflow-y-auto">
        <div className="max-w-full h-full">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Layout;
