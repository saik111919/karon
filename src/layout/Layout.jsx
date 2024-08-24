import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";

const Layout = () => {
  return (
    <>
      <NavBar />
      <main className="bg-black">
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
