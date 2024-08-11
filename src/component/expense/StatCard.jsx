import PropTypes from "prop-types";
const StatCard = ({
  title,
  value,
  icon: Icon,
  iconColor,
  bgColor,
  textColor,
}) => (
  <div
    className={`${bgColor} rounded-2xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl`}
  >
    <div className='p-6'>
      <div className='flex items-center'>
        <div
          className={`${iconColor} p-3 rounded-full ${bgColor.replace(
            "50",
            "100"
          )} mr-4`}
        >
          <Icon className='text-2xl sm:text-3xl' />
        </div>
        <div>
          <p className={`text-lg font-medium ${textColor}`}>{title}</p>
          <p className={`text-2xl sm:text-3xl font-bold ${textColor}`}>
            ₹{value.toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  </div>
);

StatCard.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  icon: PropTypes.elementType.isRequired,
  iconColor: PropTypes.string.isRequired,
  bgColor: PropTypes.string.isRequired,
  textColor: PropTypes.string.isRequired,
};

export default StatCard;
