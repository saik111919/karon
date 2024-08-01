import PropTypes from "prop-types";
const CardFooter = ({ children, className }) => {
  return (
    <div className={`p-4 bg-inherit rounded-b-xl ${className}`}>{children}</div>
  );
};

CardFooter.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default CardFooter;
