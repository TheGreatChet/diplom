import React from "react";
import { Navigate, Route, Routes, BrowserRouter } from "react-router-dom";
import { routes } from "../routes"

const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                {routes.map(({ path, Component }) =>
                    <Route key={path} path={path} element={Component} />
                )}
            </Routes>
        </BrowserRouter>
    )
}

export default AppRouter;