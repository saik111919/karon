import PropTypes from "prop-types";

const SettingsItem = ({ icon, title, description, onClick }) => (
  <div
    className='flex items-center p-4 cursor-pointer transition duration-300 ease-in-out
      dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700
      hover:bg-gray-200'
    onClick={onClick}
  >
    <div className='mr-4 text-indigo-600 dark:text-indigo-400'>{icon}</div>
    <div>
      <h3 className='text-lg font-semibold text-gray-800 dark:text-gray-100'>
        {title}
      </h3>
      <p className='text-sm text-gray-600 dark:text-gray-400'>{description}</p>
    </div>
  </div>
);

SettingsItem.propTypes = {
  icon: PropTypes.element.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default SettingsItem;
