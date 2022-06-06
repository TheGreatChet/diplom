import React, { useEffect, useState } from "react";
import "./ProfilePage.scss";
import { useHttp } from "../../../hooks/useHttp";
import { MyInput } from "../../common/MyInput/MyInput";
import { MyButton } from "../../common/MyButton/MyButton";
import { Loader } from "../../common/Loader/Loader"

export const ProfilePage = () => {
  const { request } = useHttp();
  const defaultImg = require("../../../assets/images/User-avatar.png");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [patr, setPatr] = useState("");
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [photo, setPhoto] = useState("")

  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  useEffect(() => {
    getAccountData().then(getClientData());
  }, []);

  const getAccountData = async () => {
    await sleep(500);
    setLogin((await request("/api/accounts/" + JSON.parse(localStorage.getItem("userData")).accountId))[0]["Login"]);
    setPassword((await request("/api/accounts/" + JSON.parse(localStorage.getItem("userData")).accountId))[0]["Password"]);
    setPhoto((await request("/api/accounts/" + JSON.parse(localStorage.getItem("userData")).accountId))[0]["ProfileImage"]);
  };

  const getClientData = async () => {
    await sleep(500);
    setName((await request("/api/clients/" + JSON.parse(localStorage.getItem("userData")).accountId))[0]["Name"]);
    setSurname((await request("/api/clients/" + JSON.parse(localStorage.getItem("userData")).accountId))[0]["Surname"]);
    setPatr((await request("/api/clients/" + JSON.parse(localStorage.getItem("userData")).accountId))[0]["Patronymic"]);
  };

  const getImage = (e) => {
    let file = e.target.files[0];

    let firstReader = new FileReader();
    let secondReader = new FileReader();

    firstReader.readAsText(file);
    secondReader.readAsDataURL(file);
    

    secondReader.onload = function () {
      console.log(secondReader.result.split(',')[1]);
      setPhoto(secondReader.result.split(',')[1])
    };

    secondReader.onerror = function () {
      console.log(secondReader.error);
    };
  };

  const handleSave = async () => {
    const id = JSON.parse(localStorage.getItem("userData")).accountId;

    const save = await request("/api/accounts/" + id, "PUT", {
      login: login,
      password: password,
      roleId: id,
      profileImage: photo
    });

  
  }


  if (name && password && photo) {
    return (
      <div>
        <div className="profile">
          <div className="profile-sidebar">
            <div className="profile-sidebar-content">
              <img className="profile-image" src={`data:image/png;base64,${photo}`} />
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
              <label
                className="profile-content-label"
                value={patr}
                onChange={(e) => setPatr(e.target.value)}>
                Отчество
              </label>
              <MyInput style={{ width: 250 }} />
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