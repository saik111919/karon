import { lazy } from "react";
import Expense from "../page/expense/Expense";
const Login = lazy(() => import("../Auth/Login"));
const Signup = lazy(() => import("../Auth/Signup"));
const Home = lazy(() => import("../page/Home"));
const PageNotFound = lazy(() => import("../utils/PageNotFound"));

const router = [
  {
    path: "/",
    Component: Home,
    isProtected: true,
    isShow: ["navbar"],
    name: "Home",
  },
  {
    path: "/expense",
    Component: Expense,
    isProtected: true,
    isShow: ["navbar"],
    name: "Expense",
  },
  {
    path: "/login",
    Component: Login,
    isProtected: false,
    isShow: ["auth"],
    name: "Login",
  },
  {
    path: "signup",
    Component: Signup,
    isProtected: false,
    isShow: ["auth"],
    name: "Sign up",
  },
  {
    path: "*",
    Component: PageNotFound,
    isProtected: false,
    isShow: ["auth"],
    name: "PageNotFound",
  },
];

export default router;
