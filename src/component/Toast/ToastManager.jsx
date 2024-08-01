import PropTypes from "prop-types";
import { createContext, useRef } from "react";
import ToastContainer from "./ToastContainer";

export const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  const toastRef = useRef();

  const showToast = (message, type = "success") => {
    if (toastRef.current) {
      toastRef.current.addToast(message, type);
    }
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <ToastContainer ref={toastRef} />
    </ToastContext.Provider>
  );
};

ToastProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
