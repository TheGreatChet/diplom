import React from 'react'
import "./RegPage.scss"
import {MyInput} from "../../common/MyInput/MyInput"
import {MyButton} from "../../common/MyButton/MyButton"

export const RegPage = () => {
    return (
        <div className="reg-container">
            <div className="reg-row1">
                <h1 className="reg-h1">Оставляйте свои вопросы</h1>
                <h3 className="reg-h3">А так же храните свои в удобном меню</h3>
            </div>

            <div className="reg-row2">
                <div className="reg-form">
                    <h3>Регистрация</h3>
                    <MyInput placeholder="Имя" style={{marginTop: 0, width: 240}}/>
                    <MyInput placeholder="Почта" style={{marginTop: 20, width: 240}}/>
                    <MyInput placeholder="Пароль" style={{marginTop: 20, width: 240}}/>
                    <MyButton style={{marginTop: 50, width: 180}}>Зарегестрироваться</MyButton>
                </div>
            </div>
        </div>
    )
};
