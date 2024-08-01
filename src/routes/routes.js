import { lazy } from "react";
import Login from "../page/PageAuthentication/Login.jsx";
const Home = lazy(() => import("../page/Home.jsx"));
const ExpenseTracker = lazy(() =>
  import("../page/expanseTracker/ExpenseTracker.jsx")
);
const Settings = lazy(() => import("../page/settings/Settings.jsx"));

const routes = [
  {
    path: "/karon/",
    Component: Home,
    isProtected: true,
    isHeader: true,
    title: "Home",
    icon: "HomeIcon",
  },
  {
    path: "/karon/expense",
    Component: ExpenseTracker,
    isProtected: true,
    isHeader: true,
    title: "Expense Tracker",
    icon: "ExpenseIcon",
  },
  {
    path: "/karon/settings",
    Component: Settings,
    isProtected: true,
    isHeader: true,
    title: "Settings",
    icon: "SettingIcon",
  },
  {
    path: "/karon/login",
    Component: Login,
    isProtected: false,
    isHeader: false,
    title: "Login",
    icon: "LoginIcon",
  },
];

export default routes;
