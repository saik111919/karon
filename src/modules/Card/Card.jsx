import PropTypes from "prop-types";

const Card = ({ children, className }) => {
  return (
    <div
      className={`bg-inherit rounded-lg shadow-sm w-full shadow-current ${className}`}
    >
      {children}
    </div>
  );
};

Card.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default Card;
