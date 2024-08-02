import PropTypes from "prop-types";

const Button = ({
  onClick,
  label = "Button",
  type = "button",
  disabled = false,
  className = "rounded hover:shadow border-2 border-blue-400",
}) => {
  return (
    <button
      onClick={onClick}
      type={type}
      disabled={disabled}
      className={className}
    >
      {label}
    </button>
  );
};

Button.propTypes = {
  onClick: PropTypes.func,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
  type: PropTypes.oneOf(["button", "submit", "reset"]),
  disabled: PropTypes.bool,
  className: PropTypes.string,
};

export default Button;
