import React, { useState } from "react";
import "./MainPage.scss";
import "../../../assets/images/search-background-1.jpg";
import "../../../assets/images/search-background-2.jpeg";
import "../../../assets/images/search-background-3.jpeg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { SEARCH_ROUTE } from "../../../utils/consts";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import car from '../../../assets/images/car.png'

export const MainPage = () => {
  const [req, setReq] = useState("");
  const navigate = useNavigate();

  function navToSearch() {
    if (req === "") {
      toast.error("Заполните поле поиска");
      return;
    }
    navigate(SEARCH_ROUTE, { state: { param: req } });
  }
  return (
    <div>
      <ToastContainer />
      <section className="search">
        <div className="container-center">
          <h1 className="troubles-txt" style={{ fontSize: 29 }}>Проблемы с авто?</h1>
          <div className="container center">
            <input
              className="search-input"
              type="text"
              placeholder="Введите ваш вопрос..."
              value={req}
              onChange={(e) => {
                setReq(e.target.value);
              }}
            />
            <button className="search-btn" type="submit" onClick={navToSearch}>
              <FontAwesomeIcon icon={faSearch} />
            </button>
          </div>
        </div>
        <img className="car-img" src={car} style={{height: 430, marginTop: 30}}/>
      </section>

      <section className="about">
        <div className="pic" id="pic3" />
        <div className="pic" id="pic2" />
        <div className="pic" id="pic1" />

        <div className="about-text">
          <h1 style={{ fontSize: 29 }}>О нас</h1>
          <h3>
            Компания "Автомир" занимается ремонтов автомобилей с 2001 года. Мы являемся лидером в Балтасинском районе.
            В услуги компании так же входит шиномонтаж и работа над кузовом.
          </h3>
        </div>
      </section>

      <section className="cars"></section>
    </div>
  );
};
