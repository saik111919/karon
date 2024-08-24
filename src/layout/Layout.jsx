import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import "./layout.css";

const Layout = () => {
  return (
    <div className='flex flex-col min-h-screen bg-gray-100'>
      <NavBar />
      <Suspense fallback={<LoadingSpinner />}>
        <main className='flex-grow overflow-x-hidden overflow-y-auto'>
          <div className='max-w-full h-full'>
            <Outlet />
          </div>
        </main>
      </Suspense>
    </div>
  );
};

const LoadingSpinner = () => (
  <div className='flex items-center justify-center h-screen'>
    <div className='animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500'></div>
  </div>
);

export default Layout;
