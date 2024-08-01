import "./App.css";
import { ToastProvider } from "./component/Toast/ToastManager";
import AppRoutes from "./routes/AppRoutes";

function App() {
  return (
    <>
      <ToastProvider>
        <AppRoutes />
      </ToastProvider>
    </>
  );
}

export default App;
