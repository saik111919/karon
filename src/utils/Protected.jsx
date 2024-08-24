import PropTypes from "prop-types";
import { Suspense, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "./Loader";

const Protected = ({ Component, isProtected, name }) => {
  document.body.classList.add("bg-black");
  document.body.classList.add("text-white");
  const navigate = useNavigate();
  const token = true;
  // const token = localStorage.getItem("token");
  useEffect(() => {
    document.title = name ?? "Karon";
    if (isProtected) {
      if (!token) {
        navigate("/login");
      }
    }
  }, [token, navigate, isProtected, name]);
  return (
    <Suspense fallback={<Loader />}>
      <Component />
    </Suspense>
  );
};

Protected.propTypes = {
  Component: PropTypes.elementType.isRequired,
  isProtected: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
};

export default Protected;
