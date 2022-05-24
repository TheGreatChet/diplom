import React from "react";
import "./ProfilePage.scss";
import { MyInput } from "../../common/MyInput/MyInput";
import {MyButton} from "../../common/MyButton/MyButton";

export const ProfilePage = () => {
  const defaultImg = require("../../../assets/images/User-avatar.png");
  return (
    <div className="profile">
      <div className="profile-sidebar">
        <div className="profile-sidebar-content">
          <img className="profile-image" src={defaultImg} />
          <input className="tasks-create-form-file" type="file"></input>
        </div>
      </div>
      <div className="profile-content">
        <h1 style={{marginLeft: 40}}>Профиль</h1>
        <div className="profile-content-col1">
          <label className="profile-content-label">Имя</label>
          <MyInput style={{width: 250}}/>
          <label className="profile-content-label">Фамилия</label>
          <MyInput style={{width: 250}}/>
          <label className="profile-content-label">Отчество</label>
          <MyInput style={{width: 250}}/>
        </div>
        <div className="profile-content-col2">
          <label className="profile-content-label">Почта</label>
          <MyInput style={{width: 250}}/>
          <label className="profile-content-label">Пароль</label>
          <MyInput style={{width: 250}}/>
        </div>
        <div className="profile-content-footer">
            <MyButton style={{width: 200}}>Сохранить изменения</MyButton>
        </div>
      </div>
    </div>
  );
};
