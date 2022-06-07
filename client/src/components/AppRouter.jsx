import React, {useContext, useState} from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { AdminRoutes, ClientRoutes, PublicRoutes, WorkerRoutes } from "../routes";
import { AuthContext } from "../context/AuthContext";

const AppRouter = (isAuth) => {
  const auth = useContext(AuthContext);

  if (isAuth.isAuth) {
    if (JSON.parse(localStorage.getItem('userData')).roleId == 1) {
      return (
        <Routes>
          {ClientRoutes.map(({ path, Component }) => (
            <Route key={path} path={path} element={Component} />
          ))}
          <Route path="*" element={<Navigate to="/profile" replace/>}/>
        </Routes>
      );
    }
    else if(JSON.parse(localStorage.getItem('userData')).roleId == 2) {
      return (
        <Routes>
          {WorkerRoutes.map(({ path, Component }) => (
            <Route key={path} path={path} element={Component} />
          ))}
          <Route path="*" element={<Navigate to="/profile" replace/>}/>
        </Routes>
      );
    }
    else if(JSON.parse(localStorage.getItem('userData')).roleId == 0) {
      return (
        <Routes>
          {AdminRoutes.map(({ path, Component }) => (
            <Route key={path} path={path} element={Component} />
          ))}
          <Route path="*" element={<Navigate to="/profile" replace/>}/>
        </Routes>
      );
    }
  }

  return (
    <Routes>
      {PublicRoutes.map(({ path, Component }) => (
        <Route key={path} path={path} element={Component} />
      ))}
      <Route path="*" element={<Navigate to="/" replace/>}/>
    </Routes>
    
  );
};

export default AppRouter;
