import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "../Layout/Layout";
import router from "./router";
import { Fragment } from "react";
import Protected from "../utils/Protected";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          {router.map(
            ({ path, Component, isShow, name, isProtected }, index) =>
              isShow.includes("navbar") && (
                <Fragment key={index}>
                  <Route
                    path={path}
                    element={
                      <Protected
                        Component={Component}
                        name={name}
                        isProtected={isProtected}
                      />
                    }
                  />
                </Fragment>
              )
          )}
        </Route>
        {router.map(
          ({ path, Component, isShow, name, isProtected }, index) =>
            isShow.includes("auth") && (
              <Fragment key={index}>
                <Route
                  path={path}
                  element={
                    <Protected
                      Component={Component}
                      name={name}
                      isProtected={isProtected}
                    />
                  }
                />
              </Fragment>
            )
        )}
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
