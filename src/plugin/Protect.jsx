import { useEffect } from "react";
import PropTypes from "prop-types";
// import { iconLinks } from "../utils/constent";

const Protect = ({ CMP, title, icon }) => {
  useEffect(() => {
    document.title = title;
    // if (icon) {
    //   let link =
    //     document.querySelector("link[rel*='icon']") ||
    //     document.createElement("link");
    //   link.rel = "icon";
    //   link.href = iconLinks(icon);
    //   document.head.appendChild(link);
    // }
  }, [title, icon]);
  return <CMP />;
};
export default Protect;

Protect.propTypes = {
  CMP: PropTypes.elementType.isRequired, // Validate that CMP is a React component
  title: PropTypes.string.isRequired, // Validate that title is a string
  icon: PropTypes.string, // Validate that imageUrl is a string (optional)
};
