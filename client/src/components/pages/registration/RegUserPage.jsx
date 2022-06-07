import React, { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { AuthContext } from "../../../context/AuthContext";
import { useHttp } from "../../../hooks/useHttp";
import { MyButton } from "../../common/MyButton/MyButton";
import { MyInput } from "../../common/MyInput/MyInput";

export const RegUserPage = () => {
  const {state} = useLocation();
  const { param } = state;
  console.log(param);
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [patr, setPatr] = useState("");
  
  const { error, request, clearError } = useHttp();
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  const reg = async () => {
    if (!name) {
      toast.error("Заполните поле имени");
      return;
    }
    if (!surname) {
      toast.error("Заполните поле фамилии");
      return;
    }
    const create = await request("/api/clients/add", "POST", {
      name: name,
      surname: surname,
      patronymic: patr,
      accountId: param,
    }).then(
    await new Promise(() => toast.info("Регистрация прошла успешно. \n Авторизуйтесь для продолжения работы")).then(
    await new Promise(() => navigate('/'))));
  };

  return (
    <div className="reg-container">
      <div className="reg-row1">
        <ToastContainer />
        <h1 className="reg-h1">Почти готово!</h1>
        <h3 className="reg-h3">
          Введите данные о себе, чтобы нам было проще общаться
        </h3>
      </div>

      <div className="reg-row2">
        <div className="reg-form">
          <h3>О себе</h3>
          <MyInput
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Имя"
            style={{ marginTop: 20, width: 240 }}
          />
          <MyInput
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
            placeholder="Фамилия"
            style={{ marginTop: 20, width: 240 }}
          />
          <MyInput
            value={patr}
            onChange={(e) => setPatr(e.target.value)}
            placeholder="Отчество"
            style={{ marginTop: 20, width: 240 }}
          />
          <MyButton onClick={reg} style={{ marginTop: 50, width: 120 }}>Готово</MyButton>
        </div>
      </div>
    </div>
  );
};
