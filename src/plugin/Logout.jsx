import PropTypes from "prop-types";

const Logout = ({
  tag: Tag = "button",
  text = "Logout",
  className = "",
  onClick = () => {}, // Provide a default empty function for onClick
}) => {
  return (
    <Tag className={className} onClick={onClick}>
      {text}
    </Tag>
  );
};

// PropTypes validation
Logout.propTypes = {
  tag: PropTypes.elementType,
  className: PropTypes.string,
  text: PropTypes.string,
  onClick: PropTypes.func,
};

export default Logout;
