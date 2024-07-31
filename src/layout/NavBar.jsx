// import PropTypes from "prop-types";
// import { useState, useEffect } from "react";
// import { NavLink } from "react-router-dom";
// import routes from "../routes/routes";

// // NavItem Component
// const NavItem = ({ to, children, onClick }) => (
//   <li>
//     <NavLink
//       to={to}
//       onClick={onClick}
//       className={({ isActive }) =>
//         `block p-3 text-white hover:bg-blue-500 hover:shadow-2xl hover:border-b-2 transition-all duration-300 ${
//           isActive ? "border-b-2 border-white bg-blue-500" : ""
//         }`
//       }
//     >
//       {children}
//     </NavLink>
//   </li>
// );

// NavItem.propTypes = {
//   to: PropTypes.string.isRequired,
//   children: PropTypes.node.isRequired,
//   onClick: PropTypes.func,
// };

// // ToggleTheme Component
// const ToggleTheme = ({ toggleTheme, isDarkTheme }) => (
//   <button
//     onClick={toggleTheme}
//     className='relative flex items-center text-white focus:outline-none'
//   >
//     <div className='block bg-gray-600 w-12 h-6 rounded-full'>
//       <div
//         className={`absolute top-0 left-0 w-6 h-6 rounded-full bg-white transform ${
//           isDarkTheme ? "translate-x-0" : "translate-x-6"
//         } transition-transform duration-300 ease-in-out`}
//       />
//     </div>
//   </button>
// );

// ToggleTheme.propTypes = {
//   toggleTheme: PropTypes.func.isRequired,
//   isDarkTheme: PropTypes.bool.isRequired,
// };

// // ProfileDropdown Component
// const ProfileDropdown = ({
//   isOpen,
//   toggleDropdown,
//   isDarkTheme,
//   toggleTheme,
// }) => (
//   <>
//     <div className='hidden lg:block'>
//       <ToggleTheme isDarkTheme={isDarkTheme} toggleTheme={toggleTheme} />
//     </div>

//     <div className='relative px-3 hidden lg:block'>
//       <div
//         className='flex items-center space-x-2 cursor-pointer'
//         onClick={toggleDropdown}
//       >
//         <img
//           src='https://via.placeholder.com/150'
//           alt='Profile'
//           className='rounded-full h-12 w-12 object-cover'
//         />
//         <span className='text-white font-semibold'>John Doe</span>
//         <svg
//           className={`w-4 h-4 text-white ml-1 transition-transform duration-300 ${
//             isOpen ? "rotate-180" : ""
//           }`}
//           fill='none'
//           stroke='currentColor'
//           viewBox='0 0 24 24'
//         >
//           <path
//             strokeLinecap='round'
//             strokeLinejoin='round'
//             strokeWidth='2'
//             d='M19 9l-7 7-7-7'
//           />
//         </svg>
//       </div>
//       {isOpen && (
//         <div className='absolute right-0 mt-2 w-48 bg-white text-gray-900 rounded-lg shadow-lg z-10'>
//           <ul className='py-2'>
//             <li>
//               <a href='#' className='block px-4 py-2 text-sm hover:bg-gray-100'>
//                 Settings
//               </a>
//             </li>
//             <li></li>
//             <li>
//               <a href='#' className='block px-4 py-2 text-sm hover:bg-gray-100'>
//                 Logout
//               </a>
//             </li>
//           </ul>
//         </div>
//       )}
//     </div>
//   </>
// );

// ProfileDropdown.propTypes = {
//   isOpen: PropTypes.bool.isRequired,
//   toggleDropdown: PropTypes.func.isRequired,
//   toggleTheme: PropTypes.func.isRequired,
//   isDarkTheme: PropTypes.bool.isRequired,
// };

// // NavBar Component
// const NavBar = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [isDarkTheme, setIsDarkTheme] = useState(true);
//   const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

//   useEffect(() => {
//     const storedTheme = sessionStorage.getItem("theme");
//     if (storedTheme) setIsDarkTheme(storedTheme === "dark");
//   }, []);

//   useEffect(() => {
//     document.body.className = isDarkTheme
//       ? "bg-gray-900 text-white"
//       : "bg-white text-gray-900";
//     sessionStorage.setItem("theme", isDarkTheme ? "dark" : "light");
//   }, [isDarkTheme]);

//   const toggleMenu = () => setIsOpen((prev) => !prev);
//   const closeMenu = () => setIsOpen(false);
//   const toggleTheme = () => setIsDarkTheme((prev) => !prev);
//   const toggleProfileDropdown = () => setIsProfileDropdownOpen((prev) => !prev);

//   return (
//     <nav className='bg-blue-600 w-full text-white'>
//       <div className='container mx-auto flex items-center justify-between lg:p-0 p-3'>
//         <div className='flex items-center'>
//           <div className='text-lg font-bold px-3'>
//             <a href='/'>KARON</a>
//           </div>
//           <div className='hidden lg:flex lg:items-center lg:space-x-4 xl:space-x-6'>
//             <ul className='flex gap-1'>
//               {routes.map((route, index) => (
//                 <NavItem key={index} to={route.path} onClick={closeMenu}>
//                   {route.title}
//                 </NavItem>
//               ))}
//             </ul>
//           </div>
//         </div>
//         <div className='flex items-center space-x-4'>
//           <ProfileDropdown
//             isOpen={isProfileDropdownOpen}
//             toggleDropdown={toggleProfileDropdown}
//             toggleTheme={toggleTheme}
//             isDarkTheme={isDarkTheme}
//           />
//           <button
//             onClick={toggleMenu}
//             className={
//               isOpen ? "hidden" : "text-white lg:hidden focus:outline-none"
//             }
//           >
//             <svg
//               className='w-6 h-6'
//               fill='none'
//               stroke='currentColor'
//               viewBox='0 0 24 24'
//             >
//               {isOpen ? (
//                 <path
//                   strokeLinecap='round'
//                   strokeLinejoin='round'
//                   strokeWidth='2'
//                   d='M6 18L18 6M6 6l12 12'
//                 />
//               ) : (
//                 <path
//                   strokeLinecap='round'
//                   strokeLinejoin='round'
//                   strokeWidth='2'
//                   d='M4 6h16M4 12h16M4 18h16'
//                 />
//               )}
//             </svg>
//           </button>
//         </div>
//       </div>
//       <div
//         className={`fixed top-0 left-0 h-full w-full bg-blue-600 text-white transform ${
//           isOpen ? "translate-x-0" : "-translate-x-full"
//         } transition-transform duration-300 ease-in-out lg:hidden xl:hidden`}
//       >
//         <div className='flex justify-between items-center p-4 border-b-2'>
//           <div className='text-lg font-bold'>KARON</div>
//           <button onClick={closeMenu} className='text-white focus:outline-none'>
//             <svg
//               className='w-6 h-6'
//               fill='none'
//               stroke='currentColor'
//               viewBox='0 0 24 24'
//             >
//               <path
//                 strokeLinecap='round'
//                 strokeLinejoin='round'
//                 strokeWidth='2'
//                 d='M6 18L18 6M6 6l12 12'
//               />
//             </svg>
//           </button>
//         </div>
//         <div className='flec flec-col overflow-y-auto h-full justify-between'>
//           <ul className='flex flex-col px-4 gap-2 pt-2'>
//             {routes.map((route, index) => (
//               <NavItem key={index} to={route.path} onClick={closeMenu}>
//                 {route.title}
//               </NavItem>
//             ))}
//           </ul>
//           <div className='mt-auto flex justify-between p-5 border-2 border-x-0 my-auto  '>
//             Theme
//             <ToggleTheme isDarkTheme={isDarkTheme} toggleTheme={toggleTheme} />
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default NavBar;

import { NavLink } from "react-router-dom";
import useTheme from "../hooks/useTheme";
import DropdownMenu from "./DropdownMenu";

const NavBar = () => {
  const [isDarkTheme, toggleTheme] = useTheme();

  return (
    <>
      <nav className='bg-blue-700 lg:flex block w-screen lg:relative fixed bottom-0 '>
        <div className='block lg:flex flex-1  '>
          <div className='lg:flex hidden '>
            <NavLink to={"/"} className={"p-3 self-center"}>
              KARON
            </NavLink>
          </div>
          <ul className='list-none flex align-middle justify-between lg:justify-start lg:gap-0.5'>
            <li className='flex'>
              <NavLink
                to='/'
                className={({ isActive }) =>
                  `p-3 self-center hover:border-b-2 flex gap-1 align-middle ${
                    isActive
                      ? "bg-blue-600 text-white  border-b-2"
                      : "hover:bg-blue-600 hover:text-white "
                  }`
                }
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='size-6'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25'
                  />
                </svg>
                Home
              </NavLink>
            </li>
            <li className='flex'>
              <NavLink
                to='/expense'
                className={({ isActive }) =>
                  `p-3 self-center hover:border-b-2 flex gap-1 align-middle ${
                    isActive
                      ? "bg-blue-600 text-white  border-b-2"
                      : "hover:bg-blue-600 hover:text-white "
                  }`
                }
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='size-6'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M15 8.25H9m6 3H9m3 6-3-3h1.5a3 3 0 1 0 0-6M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z'
                  />
                </svg>
                Expense
              </NavLink>
            </li>
            <li className='lg:hidden flex'>
              <NavLink
                to='/settings'
                className={({ isActive }) =>
                  `p-3 self-center hover:border-b-2 flex gap-1 align-middle ${
                    isActive
                      ? "bg-blue-600 text-white  border-b-2"
                      : "hover:bg-blue-600 hover:text-white "
                  }`
                }
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='size-6'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z'
                  />
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z'
                  />
                </svg>
                Settings
              </NavLink>
            </li>
          </ul>
        </div>

        <ul className='list-none hidden lg:flex gap-0.5'>
          <li className='flex'>
            <div className='self-center'>
              <DropdownMenu
                isDarkTheme={isDarkTheme}
                toggleTheme={toggleTheme}
              />
            </div>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default NavBar;
