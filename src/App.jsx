import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./App.css";
import AppRoutes from "./routes/AppRoutes";
import { ToastProvider } from "./plugin/Toast/ToastContext";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const App = () => {
  return (
    <ToastProvider>
      <AppRoutes />
    </ToastProvider>
  );
};
export default App;
