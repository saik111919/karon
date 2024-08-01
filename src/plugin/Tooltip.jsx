import PropTypes from "prop-types";

const Tooltip = ({ children, tooltip }) => (
  <div className='relative group'>
    <span className='truncate'>{children}</span>
    <div className='absolute hidden group-hover:block bg-gray-800 top-full text-white text-xs rounded p-2 -mt-6 left-1/2 transform -translate-x-1/2 whitespace-nowrap z-auto'>
      {tooltip}
    </div>
  </div>
);

Tooltip.propTypes = {
  children: PropTypes.node.isRequired, // Ensures that children can be any valid React node
  tooltip: PropTypes.string.isRequired, // Ensures that tooltip is a string
};

export default Tooltip;
