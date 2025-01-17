import { lazy } from "react";
import PageNotFound from "../utils/PageNotFound";
const Home = lazy(() => import("../pages/Home/Home"));
// const ExpenseTraker = lazy(() => import("../pages/Expense/ExpenseTraker"));
const Settings = lazy(() => import("../pages/settings/Settings"));
const Login = lazy(() => import("../pages/Auth/Login"));
const Signup = lazy(() => import("../pages/Auth/Signup"));
const Video = lazy(() => import("../pages/Video/Video"));

const routes = [
  {
    path: "/",
    Component: Home,
    name: "Home",
    isProtected: true,
    isHeader: true,
  },
  {
    path: "/video",
    Component: Video,
    name: "Video",
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
  {
    path: "*",
    Component: PageNotFound,
    name: "Page Not Found",
    isProtected: false,
    isHeader: false,
  },
];

export default routes;
