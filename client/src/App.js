import React from "react";
import "./assets/css/App.scss";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import { Route, Routes } from "react-router-dom";
import { PublicRoutes } from "./routes"
import { useAuth } from "./hooks/useAuth";
import {AuthContext} from './context/AuthContext'
import AppRouter from "./components/AppRouter";

function App() {
  const { token, login, logout } = useAuth()
  const isAuth = !!localStorage.getItem('userData')

  return (
    <AuthContext.Provider value={{
       token, login, logout, isAuth
    }}>
      <div className="App">
        <Header />
        <AppRouter isAuth={isAuth}/>
        <Footer />
      </div>
    </AuthContext.Provider>
  );
}

export default App;