import React, { useContext, useState } from "react";
import "./RegPage.scss";
import { REGUSER_ROUTE } from '../../../utils/consts'
import { MyInput } from "../../common/MyInput/MyInput";
import { MyButton } from "../../common/MyButton/MyButton";
import { ToastContainer, toast } from "react-toastify";
import { useHttp } from "../../../hooks/useHttp";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";
import validator from 'validator';
import agree from '../../../assets/agree.doc'
import { useRef } from "react";

export const RegPage = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const ch = useRef(null)
  const { error, request, clearError } = useHttp();
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const [exists, setExists] = useState(false)

  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

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
    if (!ch.current.checked) {
      toast.error("Примите соглашение на обработку данных")
      return;
    }

    await new Promise(async () => {
      const accounts = await request("/api/accounts/");
      if (accounts.filter(e => e.Login == login).length > 0) {
        toast.error('Пользователь с такой почтой уже зарегестрирован!')
        return;
      } else {
        const create = await request("/api/accounts/reg", "POST", {
          login: login,
          password: password,
          roleId: 1
        });
        await new Promise(() => { navigate(REGUSER_ROUTE, { state: { param: create[0]["AccountId"] } }) });
      }
    })
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
          <h2>Регистрация</h2>
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
          <div style={{marginTop: 20, display: 'flex', textAlign: 'center'}}>
            <input type='checkbox' ref={ch} style={{width: "20px", height: 20}}/>
            <a href={agree} 
            download='Согласие на обработку данных.doc'
            style={{fontSize: 14, margin: 0, marginLeft: 10, marginTop: 5}}>Соглашение на обработку данных</a>
          </div>
          <MyButton onClick={reg} style={{ marginTop: 50, width: 180 }}>
            Зарегестрироваться
          </MyButton>
        </div>
      </div>
    </div>
  );
};
