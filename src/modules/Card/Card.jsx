import PropTypes from "prop-types";

const Card = ({
  children,
  className = "bg-inherit rounded-lg shadow-sm w-full shadow-current",
}) => {
  return <div className={className}>{children}</div>;
};

Card.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default Card;
