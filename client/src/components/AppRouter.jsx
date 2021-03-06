import React, {useContext} from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { ClientRoutes, PublicRoutes } from "../routes";
import { AuthContext } from "../context/AuthContext";

const AppRouter = (isAuth) => {
  const auth = useContext(AuthContext);

  if (isAuth.isAuth) {
    if(auth.roleId)
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
      <Route path="*" element={<Navigate to="/" replace/>}/>
    </Routes>
    
  );
};

export default AppRouter;
