import PropTypes from "prop-types";

const SettingsItem = ({ icon, title, description, onClick }) => (
  <div
    className='flex items-center p-4 hover:bg-gray-200 cursor-pointer transition duration-300 ease-in-out'
    onClick={onClick}
  >
    <div className='mr-4 text-indigo-600'>{icon}</div>
    <div>
      <h3 className='text-lg font-semibold text-gray-800'>{title}</h3>
      <p className='text-sm text-gray-600'>{description}</p>
    </div>
  </div>
);

SettingsItem.propTypes = {
  icon: PropTypes.element.isRequired, // Ensure this is a React element
  title: PropTypes.string.isRequired, // Ensure this is a string
  description: PropTypes.string.isRequired, // Ensure this is a string
  onClick: PropTypes.func.isRequired, // Ensure this is a function
};

export default SettingsItem;
