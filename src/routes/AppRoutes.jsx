import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "../layout/Layout";
import routes from "./routes";
import NoPage from "../plugin/NoPage";
import Protect from "../plugin/Protect";

const AppRoutes = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/karon/' element={<Layout />}>
            {routes.map((route, index) => {
              const { path, Component, title, icon } = route;
              return (
                <Route
                  key={index}
                  path={path}
                  element={
                    <Protect CMP={Component} title={title} icon={icon} />
                  }
                />
              );
            })}
          </Route>
          <Route path='*' element={<NoPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};
export default AppRoutes;
