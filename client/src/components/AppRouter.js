import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import { PublicRoutes } from "../routes"

const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                {PublicRoutes.map(({ path, Component }) =>
                    <Route key={path} path={path} element={Component} />
                )}
            </Routes>
        </BrowserRouter>
    )
}

export default AppRouter;