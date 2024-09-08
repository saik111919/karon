import PropTypes from "prop-types";
import { motion } from "framer-motion";
import { formatIndianCurrency } from "../../utils/common";
import { cloneElement } from "react";

const Card = ({ title, amount, icon, color, textColor }) => (
  <div
    className={`${color} rounded-lg shadow-sm p-4 sm:p-5 md:p-6 flex flex-col justify-between h-full transform transition-all duration-300 ease-in-out`}
  >
    <div className='flex items-center justify-between mb-2 sm:mb-3 md:mb-4'>
      <h2 className='text-xs sm:text-sm md:text-base font-medium text-gray-800 dark:text-gray-200 uppercase tracking-wider'>
        {title}
      </h2>
      <motion.div
        whileHover={{ rotate: 15, scale: 1.1 }}
        transition={{ type: "spring", stiffness: 300 }}
        className={`p-2 sm:p-3 md:p-4 rounded-full bg-white bg-opacity-25 shadow-md`}
      >
        {cloneElement(icon, {
          className: `w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 ${textColor}`,
        })}
      </motion.div>
    </div>
    <p
      className={`${textColor} text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mt-2 sm:mt-3 md:mt-4`}
    >
      {formatIndianCurrency(amount)}
    </p>
  </div>
);

Card.propTypes = {
  title: PropTypes.string.isRequired,
  amount: PropTypes.number.isRequired,
  icon: PropTypes.element.isRequired,
  color: PropTypes.string.isRequired,
  textColor: PropTypes.string.isRequired,
};

export default Card;
