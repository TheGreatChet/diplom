import React, { useEffect, useState } from 'react';
import './Header.scss';
import "../../assets/fonts/Rubik-Light.ttf";
import { List } from 'react-bootstrap-icons';
import logo from '../../assets/images/main-icon-clean.svg';
import logo_text from '../../assets/images/logo-text.svg';
import { MyButton } from "../common/MyButton/MyButton"
import { MyModal } from '../common/MyModal/MyModal';
import { MyInput } from '../common/MyInput/MyInput';



const Header = () => {
    const [isNavVisible, setIsNavVisible] = useState(true);
    const [isSmallScreen, setIsSmallScreen] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);

    const handleLoginClick = () => {
        setIsModalVisible(true)
    };

    useEffect(() => {
        const mediaQuery = window.matchMedia("(max-width:1000px)");
        mediaQuery.addEventListener("change", handleMediaQueryChange);
        handleMediaQueryChange(mediaQuery);

        return () => {
            mediaQuery.removeEventListener("click", handleMediaQueryChange);
        }
    }, []);

    const handleMediaQueryChange = (mediaQuery) => {
        if (mediaQuery) {
            setIsSmallScreen(true);
        } else {
            setIsSmallScreen(false);
        }
    }

    return (
        <div>
            <header className="header">
                <div className="header-vertical-center">
                    <img src={logo} alt="logo" className="logo-image" />
                    <img src={logo_text} alt="logo text" className="logo-text" />
                    <div className="divider" />
                    <p>Поддержка</p>
                </div>
                {(isNavVisible || !isSmallScreen) && (
                    <nav className="auth-btn-div">
                        <MyButton onClick={handleLoginClick}>Войти</MyButton>
                        <MyButton style={{ width: 120 }}>Регистрация</MyButton>
                    </nav>
                )}
                <button onClick={() => setIsNavVisible(!isNavVisible)} className="btn-list-icon">
                    <List size={20}/>
                </button>
            </header>

            <MyModal title="Авторизация" visible={isModalVisible} setVisible={setIsModalVisible}>
                <div className="form-login">
                    <MyInput id="login" placeholder="Введите логин..." style={{width: 250, margin: 5}} />
                    <MyInput id="password" placeholder="Введите пароль..." style={{width: 250, margin: 5}} />
                    <MyButton style={{width: 120}}>Войти</MyButton>
                </div>
            </MyModal>
        </div>
    )
}

export default Header;