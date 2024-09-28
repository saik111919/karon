// import { NavLink } from "react-router-dom";
// import PropTypes from "prop-types";
// import { motion } from "framer-motion";

// const BottomBar = ({ routes, getIcon }) => (
//   <motion.div
//     className={`sticky bottom-0 w-full bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white shadow-lg md:hidden lg:hidden block`}
//     initial={{ y: "100%" }}
//     animate={{ y: 0 }}
//     transition={{ type: "spring", stiffness: 300, damping: 30 }}
//   >
//     <nav className="flex justify-around p-2">
//       {routes.map(
//         ({ path, name, isHeader }, index) =>
//           isHeader && (
//             <NavLink
//               key={index}
//               to={path}
//               className={({ isActive }) =>
//                 `flex flex-col items-center text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white ${
//                   isActive ? "text-blue-500 dark:text-blue-400" : ""
//                 }`
//               }
//             >
//               <motion.div
//                 whileHover={{ scale: 1.1 }}
//                 whileTap={{ scale: 0.95 }}
//               >
//                 {getIcon(name)}
//               </motion.div>
//               <motion.span
//                 className="text-xs"
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 transition={{ delay: 0.1 }}
//               >
//                 {name}
//               </motion.span>
//             </NavLink>
//           )
//       )}
//     </nav>
//   </motion.div>
// );

// BottomBar.propTypes = {
//   routes: PropTypes.arrayOf(
//     PropTypes.shape({
//       path: PropTypes.string.isRequired,
//       name: PropTypes.string.isRequired,
//       isHeader: PropTypes.bool.isRequired,
//     })
//   ).isRequired,
//   getIcon: PropTypes.func.isRequired,
// };

// export default BottomBar;

import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import { motion } from "framer-motion";
import { Home, Settings, User, Bell, Component, Video } from "lucide-react";
import React from "react";

const iconComponents = (icon) => {
  const icons = {
    Home,
    Settings,
    User,
    Video,
    Bell,
  };

  return icons[icon] || Component;
};

const BottomBar = ({ routes }) => (
  <motion.div
    className="sticky bottom-0 w-full dark:bg-gray-900 shadow-lg lg:hidden block backdrop-blur-lg bg-opacity-80 dark:bg-opacity-80"
    initial={{ y: "100%" }}
    animate={{ y: 0 }}
    transition={{ type: "spring", stiffness: 300, damping: 30 }}
  >
    <nav className="flex justify-around p-2">
      {routes.map(
        ({ path, name, isHeader }, index) =>
          isHeader && (
            <NavLink
              key={index}
              to={path}
              className={({ isActive }) =>
                `relative flex flex-col items-center p-2 rounded-lg transition-all duration-300 ease-in-out ${
                  isActive
                    ? "text-blue-500 dark:text-blue-400 bg-blue-100 dark:bg-blue-900"
                    : "text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="relative"
                  >
                    {React.createElement(iconComponents(name), {
                      size: 24,
                      className: `transition-all duration-300 ${
                        isActive ? "stroke-current" : "stroke-2"
                      }`,
                    })}
                    {isActive && (
                      <motion.div
                        className="absolute inset-0 bg-transparent rounded-full opacity-20"
                        layoutId="bottomBarHighlight"
                        initial={false}
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 30,
                        }}
                      />
                    )}
                  </motion.div>
                  <motion.span
                    className="text-xs mt-1 font-medium"
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    {name}
                  </motion.span>
                </>
              )}
            </NavLink>
          )
      )}
    </nav>
  </motion.div>
);

BottomBar.propTypes = {
  routes: PropTypes.arrayOf(
    PropTypes.shape({
      path: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      isHeader: PropTypes.bool.isRequired,
    })
  ).isRequired,
};

export default BottomBar;
