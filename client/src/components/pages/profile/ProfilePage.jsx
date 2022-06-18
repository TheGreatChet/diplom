import React, { useEffect, useState } from "react";
import "./ProfilePage.scss";
import { useHttp } from "../../../hooks/useHttp";
import { MyInput } from "../../common/MyInput/MyInput";
import { MyButton } from "../../common/MyButton/MyButton";
import { Loader } from "../../common/Loader/Loader"
import { ToastContainer, toast } from "react-toastify";
import validator from 'validator';


export const ProfilePage = () => {
  const { request } = useHttp();
  const defaultImg = require("../../../assets/images/User-avatar.png");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [patr, setPatr] = useState("");
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [photo, setPhoto] = useState("")
  const [loading, setLoading] = useState(true);

  const id = JSON.parse(localStorage.getItem("userData")).accountId;
  const roleId = JSON.parse(localStorage.getItem("userData")).roleId;

  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  useEffect(() => {
    if (roleId == 1) {
      getAccountData().then(getClientData());
    } else {
      getAccountData().then(getEmplData());
    }
  }, []);

  const getAccountData = async () => {
    setLogin((await request("/api/accounts/" + id))[0]["Login"]);
    setPassword((await request("/api/accounts/" + id))[0]["Password"]);
    setPhoto((await request("/api/accounts/" + id))[0]["ProfileImage"]);
  };

  const getClientData = async () => {
    await sleep(100);
    setName((await request("/api/clients/" + id))[0]["Name"]);
    setSurname((await request("/api/clients/" + id))[0]["Surname"]);
    setPatr((await request("/api/clients/" + id))[0]["Patronymic"]);
    setLoading(false)
  };

  const getEmplData = async () => {
    await sleep(100);
    setName((await request("/api/employee/" + id))[0]["Name"]);
    setSurname((await request("/api/employee/" + id))[0]["Surname"]);
    setPatr((await request("/api/employee/" + id))[0]["Patronymic"]);
    setLoading(false)
  }


  const getImage = (e) => {
    let file = e.target.files[0];

    let firstReader = new FileReader();
    let secondReader = new FileReader();

    firstReader.readAsText(file);
    secondReader.readAsDataURL(file);


    secondReader.onload = function () {
      setPhoto(secondReader.result.split(',')[1])
    };

    secondReader.onerror = function () {
      toast.error(secondReader.error);
    };
  };

  const saveAcc = async () => {
    const acc = await request("/api/accounts/" + id, "PUT", {
      login: login,
      password: password,
      roleId: roleId,
      profileImage: photo
    })
  }

  const saveClient = async () => {
    if (!patr) setPatr("");
    const save = await request("/api/clients/" + id, "PUT", {
      name: name,
      surname: surname,
      patronymic: patr
    });
  }

  const saveEmpl = async () => {
    if (!patr) setPatr("");
    const save = await request("/api/employee/" + id, "PUT", {
      name: name,
      surname: surname,
      patronymic: patr
    });
  }

  const handleSave = () => {
    if (!name || !surname || !login || !password) {
      toast.error("Заполните все поля!\n(Поле отчества необязательное)");
      return;
    }
    if (!validator.isEmail(login)) {
      toast.error("Используйте верный формат почты: example@yandex.ru");
      return;
    }
    if (!validator.isAlpha(name, ['ru-RU']) || !validator.isAlpha(surname, ['ru-RU']) || (patr && !validator.isAlpha(patr, ['ru-RU']))) {
      console.log('a')
      toast.error("Используйте только кириллицу");
      return;
    }
    if (roleId == 1) {
      saveAcc().then(saveClient()).then(toast.success("Успешно"));
    } else {
      saveAcc().then(saveEmpl()).then(toast.success("Успешно"));
    }
  }


  if (!loading) {
    return (
      <div>
        <div className="profile">
          <div className="profile-sidebar">
            <div className="profile-sidebar-content">
              <img className="profile-image" src={`data:image/png;base64,${photo}`} onError={(e) => {
                e.target.onerror = null;
                e.target.src = defaultImg;
              }} />
              <input className="tasks-create-form-file" type="file" accept=".jpeg, .png, .jpg" onChange={getImage}></input>
            </div>
          </div>
          <div className="profile-content">
            <h1 style={{ marginLeft: 40 }}>Профиль</h1>
            <div className="profile-content-col1">
              <label className="profile-content-label">Имя</label>
              <MyInput
                style={{ width: 250 }}
                value={name}
                onChange={(e) => setName(e.target.value)} />
              <label className="profile-content-label">Фамилия</label>
              <MyInput
                style={{ width: 250 }}
                value={surname}
                onChange={(e) => setSurname(e.target.value)}
              />
              <label className="profile-content-label">Отчество</label>
              <MyInput 
                style={{ width: 250 }}
                value={patr}
                onChange={(e) => setPatr(e.target.value)} />
            </div>
            <div className="profile-content-col2">
              <label className="profile-content-label">Почта</label>
              <MyInput
                style={{ width: 250 }}
                value={login}
                onChange={(e) => setLogin(e.target.value)}
              />
              <label className="profile-content-label">Пароль</label>
              <MyInput
                type="password"
                style={{ width: 250 }}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="profile-content-footer">
              <MyButton style={{ width: 200 }} onClick={handleSave}>
                Сохранить изменения
              </MyButton>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div style={{ height: 600, display: "flex", justifyContent: "center" }}>
        <Loader />
      </div>
    );
  }
};