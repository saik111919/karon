import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "../layout/Layout.jsx";
import routes from "./routes";
import NoPage from "../plugin/NoPage";
import Protect from "../plugin/Protect";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/karon/' element={<Layout />}>
          {routes.map(
            ({ path, Component, title, icon, isHeader, isProtected }, index) =>
              isHeader && (
                <Route
                  key={index}
                  path={path}
                  element={
                    <Protect
                      CMP={Component}
                      title={title}
                      icon={icon}
                      isProtected={isProtected}
                    />
                  }
                />
              )
          )}
        </Route>
        {routes.map(
          ({ path, Component, title, icon, isHeader, isProtected }, index) =>
            !isHeader && (
              <Route
                key={index}
                path={path}
                element={
                  <Protect
                    CMP={Component}
                    title={title}
                    icon={icon}
                    isProtected={isProtected}
                  />
                }
              />
            )
        )}
        <Route path='*' element={<NoPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
