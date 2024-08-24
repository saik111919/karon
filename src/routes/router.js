import Login from "../Auth/Login";
import Home from "../page/Home";
import PageNotFound from "../utils/PageNotFound";

const router = [
  {
    path: "/",
    Component: Home,
    isProtected: true,
    isShow: ["navbar"],
    name: "Home",
  },
  {
    path: "/login",
    Component: Login,
    isProtected: false,
    isShow: ["auth"],
    name: "Login",
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
