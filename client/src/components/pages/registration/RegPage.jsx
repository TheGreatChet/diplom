import React, { useContext, useState } from "react";
import "./RegPage.scss";
import {REGUSER_ROUTE} from '../../../utils/consts'
import { MyInput } from "../../common/MyInput/MyInput";
import { MyButton } from "../../common/MyButton/MyButton";
import { ToastContainer, toast } from "react-toastify";
import { useHttp } from "../../../hooks/useHttp";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";
import validator from 'validator';

export const RegPage = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const { error, request, clearError } = useHttp();
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  const reg = async () => {
    if (!login) {
      toast.error("Заполните поле почты");
      return;
    }
    if (!password) {
      toast.error("Заполните поле пароля");
      return;
    }
    if (!validator.isEmail(login)) {
      toast.error("Используйте верный формат почты: example@yandex.ru");
      return;
    }
    const create = await request("/api/accounts/reg", "POST", {   
        login: login,
        password: password,
        roleId: 1
    });

    
    await new Promise(() => navigate(REGUSER_ROUTE, {state: {param: create[0]["AccountId"]}}))
  };

  return (
    <div className="reg-container">
      <div className="reg-row1">
        <ToastContainer />
        <h1 className="reg-h1">Оставляйте свои вопросы</h1>
        <h3 className="reg-h3">А так же храните свои в удобном меню</h3>
      </div>

      <div className="reg-row2">
        <div className="reg-form">
          <h3>Регистрация</h3>
          <MyInput
            value={login}
            onChange={(e) => setLogin(e.target.value)}
            type="email"
            placeholder="Почта"
            style={{ marginTop: 20, width: 240 }}
            maxLength="255"
          />
          <MyInput
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Пароль"
            style={{ marginTop: 20, width: 240 }}
            maxLength="20"
          />
          <MyButton onClick={reg} style={{ marginTop: 50, width: 180 }}>
            Зарегестрироваться
          </MyButton>
        </div>
      </div>
    </div>
  );
};
