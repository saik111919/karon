import { lazy } from "react";
import PageNotFound from "../utils/PageNotFound";
import DeviceStatusDashboard from "../pages/DeviceStatusDashboard/DeviceStatusDashboard";

const Home = lazy(() => import("../pages/Home/Home"));
// const ExpenseTraker = lazy(() => import("../pages/Expense/ExpenseTraker"));
const Settings = lazy(() => import("../pages/settings/Settings"));
const Login = lazy(() => import("../pages/Auth/Login"));
const Signup = lazy(() => import("../pages/Auth/Signup"));

const routes = [
  {
    path: "/",
    Component: Home,
    name: "Home",
    isProtected: true,
    isHeader: true,
  },
  // {
  //   path: "/expense",
  //   Component: ExpenseTraker,
  //   name: "Expense Traker",
  //   isProtected: true,
  //   isHeader: true,
  // },
  {
    path: "/login",
    Component: Login,
    name: "Login",
    isProtected: false,
    isHeader: false,
  },
  {
    path: "/signup",
    Component: Signup,
    name: "Signup",
    isProtected: false,
    isHeader: false,
  },
  {
    path: "/device-status",
    Component: DeviceStatusDashboard,
    name: "Device Status",
    isProtected: true,
    isHeader: true,
  },
  {
    path: "/settings",
    Component: Settings,
    name: "Settings",
    isProtected: true,
    isHeader: true,
  },
  {
    path: "*",
    Component: PageNotFound,
    name: "Page Not Found",
    isProtected: false,
    isHeader: false,
  },
];

export default routes;
