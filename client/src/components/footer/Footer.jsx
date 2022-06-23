import "./Footer.scss";
import React from "react";
import logo from "../../assets/images/main-icon-clean.svg";
import { Instagram } from "react-bootstrap-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarker } from "@fortawesome/free-solid-svg-icons";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-col1">
        <img className="footer-logo-image" src={logo} alt="Логотип" />
        <div className="footer-col1-row2">
          <a
            className="link"
            href="https://yandex.ru/maps/-/CCUFJ2GfcD"
            rel="noreferrer"
            target="_blank">
            Сервис на карте
            <FontAwesomeIcon icon={faMapMarker} />
          </a>
        </div>
      </div>

      <div className="footer-col2">
        <h4>Свяжитесь с нами</h4>
        <h5>8 (986) 920-10-10</h5>
        <h5>п.г.т. Балтаси, ул. Наримана 123/1 (около ЦРБ)</h5>
      </div>
    </footer>
  );
};

export default Footer;
