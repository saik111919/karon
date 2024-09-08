import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";

const BottomBar = ({ routes, toggleSidebar, getIcon }) => (
  <div
    className={`fixed bottom-0 left-0 right-0 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white shadow-lg z-50 md:hidden lg:hidden block`}
  >
    <nav className='flex justify-around p-2'>
      {routes.map(
        ({ path, name, isHeader }, index) =>
          isHeader && (
            <NavLink
              key={index}
              to={path}
              className='flex flex-col items-center text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
              onClick={() => toggleSidebar(false)}
            >
              {getIcon(name)}
              <span className='text-xs'>{name}</span>
            </NavLink>
          )
      )}
    </nav>
  </div>
);

BottomBar.propTypes = {
  routes: PropTypes.arrayOf(
    PropTypes.shape({
      path: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
  toggleSidebar: PropTypes.func.isRequired,
  getIcon: PropTypes.func.isRequired,
};

export default BottomBar;
