import { useContext } from "react";
import { ToastContext } from "../component/Toast/ToastManager";

const useToast = () => {
  return useContext(ToastContext);
};
export default useToast;
