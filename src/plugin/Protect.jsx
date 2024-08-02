import { useEffect } from "react";
import PropTypes from "prop-types";
import { useNavigate, useLocation } from "react-router-dom";
import { iconLinks } from "../utils/constent";

const Protect = ({ CMP, title, icon, isProtected }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const token = sessionStorage.getItem("token");

  useEffect(() => {
    document.title = title;

    if (isProtected) {
      if (!token) {
        navigate("/karon/login");
      }
    } else {
      const unprotectedRoutes = ["/karon/login", "/karon/signup"];
      if (token && unprotectedRoutes.includes(location.pathname)) {
        navigate("/karon/"); // Redirect to home page or any other protected page
      }
    }

    if (icon) {
      let link =
        document.querySelector("link[rel*='icon']") ||
        document.createElement("link");
      link.rel = "icon";
      link.href = iconLinks(icon);
      document.head.appendChild(link);
    }
  }, [title, icon, isProtected, token, navigate, location.pathname]);

  return <CMP />;
};

Protect.propTypes = {
  CMP: PropTypes.elementType.isRequired, // Validate that CMP is a React component
  title: PropTypes.string.isRequired, // Validate that title is a string
  icon: PropTypes.string, // Validate that icon is a string (optional)
  isProtected: PropTypes.bool.isRequired, // Validate that isProtected is a boolean
};

export default Protect;
