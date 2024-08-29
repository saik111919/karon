import NavBar from "./NavBar";
import { Outlet } from "react-router-dom";
import "./layout.css";

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white">
      <NavBar />
      <main className="flex-grow md:ml-64 overflow-x-hidden overflow-y-auto">
        <div className="max-w-full h-full">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Layout;
