import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import { Suspense } from "react";

const Layout = () => {
  return (
    <>
      <div className='flex lg:flex-col flex-col-reverse h-screen w-screen'>
        <NavBar />
        <Suspense
          fallback={
            <div className='text-center w-full h-screen flex items-center justify-center'>
              <div className='loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-20 w-20'></div>
            </div>
          }
        >
          <main className='overflow-y-auto px-1 w-full page-container overflow-x-hidden flex-grow lg:m-0 mb-12 lg:pb-0 pb-2 lg:shadow-none shadow-lg'>
            <Outlet />
          </main>
        </Suspense>
      </div>
    </>
  );
};

export default Layout;
