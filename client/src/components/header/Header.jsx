import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useHttp } from "../../hooks/useHttp";
import { REG_ROUTE, MAIN_ROUTE, PROFILE_ROUTE } from "../../utils/consts";
import { List } from "react-bootstrap-icons";
import logo from "../../assets/images/main-icon-clean.svg";
import logo_text from "../../assets/images/logo-text.svg";
import { MyButton } from "../common/MyButton/MyButton";
import { MyModal } from "../common/MyModal/MyModal";
import { MyInput } from "../common/MyInput/MyInput";
import { AuthContext } from "../../context/AuthContext";
import "../../assets/fonts/Rubik-Light.ttf";
import "./Header.scss";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Header = () => {
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [isLoginVisible, setIsLoginVisible] = useState(false);
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const auth = useContext(AuthContext);
  const { error, request, clearError } = useHttp();

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width:1000px)");
    mediaQuery.addEventListener("change", handleMediaQueryChange);
    handleMediaQueryChange(mediaQuery);

    return () => {
      mediaQuery.removeEventListener("click", handleMediaQueryChange);
    };
  }, []);

  const handleMediaQueryChange = (mediaQuery) => {
    if (mediaQuery) {
      setIsSmallScreen(true);
    } else {
      setIsSmallScreen(false);
    }
  };

  const loginHandler = async () => {
    try {
      if (!login) {
        toast.error("Заполните поле логина");
        return;
      }
      if (!password) {
        toast.error("Заполните поле пароля");
        return;
      }
      const data = await request("/api/accounts/login", "POST", {
        username: login,
        password: password,
      });

      auth.login(data.token, data.roleId);
      navigate(PROFILE_ROUTE);
    } catch (error) {}
  };

  useEffect(() => {
    clearError();
  }, [error, clearError]);

  return (
    <div>
      <ToastContainer />

      <header className="header" id="top">
        <div className="header-vertical-center">
          <img
            src={logo}
            alt="logo"
            className="logo-image"
            onClick={() => navigate(MAIN_ROUTE)}
          />
          <img
            src={logo_text}
            alt="logo text"
            className="logo-text"
            onClick={() => navigate(MAIN_ROUTE)}
          />
          <div className="divider" />
          <p>Поддержка</p>
        </div>
        {(isNavVisible || !isSmallScreen) && !auth.token && (
          <nav className="auth-btn-div">
            <MyButton onClick={() => setIsLoginVisible(true)}>Войти</MyButton>
            <MyButton
              style={{ width: 120 }}
              onClick={() => navigate(REG_ROUTE)}>
              Регистрация
            </MyButton>
          </nav>
        )}
        {(isNavVisible || !isSmallScreen) && auth.token && (
          <nav className="auth-btn-div">
            <MyButton onClick={() => auth.logout()}>Выйти</MyButton>
          </nav>
        )}
        <button
          onClick={() => setIsNavVisible(!isNavVisible)}
          className="btn-list-icon">
          <List size={20} />
        </button>
      </header>

      <MyModal
        title="Авторизация"
        visible={isLoginVisible}
        setVisible={setIsLoginVisible}>
        <div className="form login">
          <MyInput
            id="login"
            placeholder="Введите логин..."
            style={{ width: 250, margin: 5 }}
            value={login}
            onChange={(e) => setLogin(e.target.value)}
          />
          <MyInput
            id="password"
            placeholder="Введите пароль..."
            style={{ width: 250, margin: 5 }}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <MyButton style={{ width: 120 }} onClick={loginHandler}>
            Войти
          </MyButton>
        </div>
      </MyModal>
    </div>
  );
};

export default Header;
