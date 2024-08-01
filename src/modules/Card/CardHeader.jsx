import PropTypes from "prop-types";
const CardHeader = ({ children, className }) => {
  return (
    <div className={`bg-inherit border-b-2 rounded-t-xl ${className}`}>
      {children}
    </div>
  );
};

CardHeader.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default CardHeader;
