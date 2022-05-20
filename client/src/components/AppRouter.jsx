import React from "react";
import { Route, Routes } from "react-router-dom";
import { ClientRoutes, PublicRoutes } from "../routes";

const AppRouter = (isAuth) => {

  if (isAuth.isAuth) {
    return (
      <Routes>
        {ClientRoutes.map(({ path, Component }) => (
          <Route key={path} path={path} element={Component} />
        ))}
      </Routes>
    );
  }

  return (
    <Routes>
      {PublicRoutes.map(({ path, Component }) => (
        <Route key={path} path={path} element={Component} />
      ))}
    </Routes>
  );
};

export default AppRouter;
