import PropTypes from "prop-types";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Protected = ({ Component, isProtected, name }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  useEffect(() => {
    document.title = name ?? "Karon";
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate, isProtected, name]);
  return <Component />;
};

Protected.propTypes = {
  Component: PropTypes.elementType.isRequired,
  isProtected: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
};

export default Protected;
