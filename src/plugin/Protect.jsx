import PropTypes from "prop-types";
import { Suspense, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../component/Loader";

const Protect = ({ Component, name, isProtected }) => {
  document.body.classList.add("bg-black");
  document.body.classList.add("text-white");
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  useEffect(() => {
    document.title = name;
    if (isProtected) {
      if (!token) {
        navigate("/login");
      }
    }
  }, [name, navigate, token, isProtected]);

  return (
    <Suspense fallback={<Loader />}>
      <Component />
    </Suspense>
  );
};

Protect.propTypes = {
  Component: PropTypes.elementType.isRequired,
  name: PropTypes.string.isRequired,
  isProtected: PropTypes.bool.isRequired,
};

export default Protect;
