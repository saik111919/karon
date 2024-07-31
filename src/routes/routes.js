import { lazy } from "react";
const Home = lazy(() => import("../page/Home.jsx"));
const ExpenseTracker = lazy(() =>
  import("../page/expanseTracker/ExpenseTracker.jsx")
);
const Settings = lazy(() => import("../page/settings/Settings.jsx"));

const routes = [
  {
    path: "/",
    Component: Home,
    isProtected: true,
    isHeader: true,
    title: "Home",
    icon: "HomeIcon",
  },
  {
    path: "/expense",
    Component: ExpenseTracker,
    isProtected: true,
    isHeader: true,
    title: "Expense Tracker",
    icon: "ExpenseIcon",
  },
  {
    path: "/settings",
    Component: Settings,
    isProtected: true,
    isHeader: true,
    title: "Settings",
    icon: "SettingIcon",
  },
];

export default routes;
