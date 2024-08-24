import { lazy } from "react";

const Home = lazy(() => import("../pages/Home/Home"));
const ExpenseTraker = lazy(() => import("../pages/Expense/ExpenseTraker"));
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
  {
    path: "/expense",
    Component: ExpenseTraker,
    name: "Expense Traker",
    isProtected: true,
    isHeader: true,
  },
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
    path: "/settings",
    Component: Settings,
    name: "Settings",
    isProtected: true,
    isHeader: true,
  },
];

export default routes;
