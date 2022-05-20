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
      <ToastContainer/>
      <section className="search">
        <div className="container-center">
          <h2 className="search-text">Проблемы с авто?</h2>
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
      </section>

      <section className="about">
        <div className="pic" id="pic3" />
        <div className="pic" id="pic2" />
        <div className="pic" id="pic1" />

        <div className="about-text">
          <h2>О нас</h2>
          <h4>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit.
            Exercitationem accusantium laboriosam inventore quasi repudiandae.
            Libero officia ut doloribus eos, tempore voluptatibus nisi fuga
            eveniet quos explicabo dolores autem, provident corrupti.
          </h4>
        </div>
      </section>

      <section className="cars"></section>
    </div>
  );
};
