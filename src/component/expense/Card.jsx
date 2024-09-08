import PropTypes from "prop-types";
import { motion } from "framer-motion";
import { formatIndianCurrency } from "../../utils/common";
import { cloneElement } from "react";

const Card = ({ title, amount, icon, color, textColor }) => (
  <motion.div
    whileHover={{ y: -5 }}
    transition={{ type: "spring", stiffness: 400 }}
    className={`${color} rounded-lg shadow-lg p-6 flex flex-col space-y-4`}
  >
    <div className='flex items-center justify-between'>
      <div className='flex flex-col'>
        <p className={`${textColor} text-3xl md:text-4xl font-bold`}>
          {formatIndianCurrency(amount)}
        </p>
        <h2 className='text-sm font-medium text-gray-800 dark:text-gray-200 uppercase tracking-wider mt-2'>
          {title}
        </h2>
      </div>
      <motion.div
        whileHover={{ rotate: 15, scale: 1.1 }}
        transition={{ type: "spring", stiffness: 300 }}
        className={`p-4 rounded-full bg-white bg-opacity-25 shadow-lg`}
      >
        {cloneElement(icon, { className: `w-8 h-8 ${textColor}` })}
      </motion.div>
    </div>
  </motion.div>
);

Card.propTypes = {
  title: PropTypes.string.isRequired,
  amount: PropTypes.number.isRequired,
  icon: PropTypes.element.isRequired,
  color: PropTypes.string.isRequired,
  textColor: PropTypes.string.isRequired,
};

export default Card;
