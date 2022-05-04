import React from 'react';
import './Header.scss';
import "../../assets/fonts/Rubik-Light.ttf";
import logo from '../../assets/images/main-icon-clean.svg';
import logo_text from '../../assets/images/logo-text.svg';

const Header = () => {
    return (
        <header className="header">
            <div className="vertical-center">
                <img src={logo} alt="logo" className="logo-image" />
                <img src={logo_text} alt="logo text" className="logo-text" />
                <div className="divider" />
                <p>Поддержка</p>
            </div>
        </header>
    )
}

export default Header;