import './Footer.scss';
import React from 'react';
import logo from '../../assets/images/main-icon.svg'
import logo_text from '../../assets/images/logo-text.svg';
import { Instagram } from 'react-bootstrap-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  faMapMarker } from "@fortawesome/free-solid-svg-icons";

const Footer = () => {
    return (
        <footer class="footer">
        <div class="footer-col1">
          <img class="footer-logo-image" src={logo} alt="Логотип"/>
          <img class="footer-logo-text" src={logo_text} alt="АвтоМир"/>

          <div class="footer-col1-row2">
            <a class="link" href="https://yandex.ru/maps/-/CCUFJ2GfcD" rel='noreferrer' target="_blank">
              Сервис на карте 
              <FontAwesomeIcon icon={faMapMarker}/>
            </a>
          </div>
        </div>

        <div class="footer-col2">
          <h4>Меню</h4>
          <h5>Главная</h5>
          <h5>Авторизация</h5>
          <h5>Поиск</h5>
        </div>

        <div class="footer-col3">
          <h4>Свяжитесь с нами</h4>
          <h5>8 (986) 920-10-10</h5>
          <h5>п.г.т. Балтаси, ул. Наримана 123/1 (около ЦРБ)</h5>
        </div> 

        <div class="footer-col4">
          <h4>Социальные сети</h4>
            <a class="link" href="https://www.instagram.com/avtomir_116/" rel='noreferrer' target="_blank">
              <div class="container">
                <h5>Инстаграм</h5>
                <Instagram class="inst-icon"/>
              </div>
            </a>
        </div>
      </footer>
    )
}

export default Footer;