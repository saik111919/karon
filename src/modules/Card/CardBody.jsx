import PropTypes from "prop-types";
const CardBody = ({ children, className }) => {
  return <div className={`text-current ${className}`}>{children}</div>;
};

CardBody.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default CardBody;
