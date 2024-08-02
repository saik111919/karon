import PropTypes from "prop-types";
const CardBody = ({ children, className = "text-current" }) => {
  return <div className={className}>{children}</div>;
};

CardBody.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default CardBody;
