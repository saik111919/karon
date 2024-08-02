import PropTypes from "prop-types";
const CardHeader = ({ children, className = "bg-inherit rounded-t-xl " }) => {
  return <div className={className}>{children}</div>;
};

CardHeader.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default CardHeader;
