import PropTypes from "prop-types";
const ThemeComp = ({ toggleTheme, isDarkTheme }) => {
  return (
    <button
      onClick={toggleTheme}
      className='relative flex items-center text-white focus:outline-none'
    >
      <div className='block bg-gray-600 w-12 h-6 rounded-full'>
        <div
          className={`absolute top-0 left-0 w-6 h-6 rounded-full bg-white transform ${
            isDarkTheme ? "translate-x-0" : "translate-x-6"
          } transition-transform duration-300 ease-in-out`}
        />
      </div>
    </button>
  );
};
ThemeComp.propTypes = {
  toggleTheme: PropTypes.func.isRequired,
  isDarkTheme: PropTypes.bool.isRequired,
};
export default ThemeComp;
