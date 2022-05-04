import React from "react";
import "./MainPage.scss";
import "../../../assets/images/search-background-1.jpg";
import "../../../assets/images/search-background-2.jpeg";
import "../../../assets/images/search-background-3.jpeg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

export const MainPage = () => {
  return (
    <div>
      <section class="search">
        <div class="container-center">
          <h2 class="search-text">Проблемы с авто?</h2>
          <div class="container center">
            <input class="search-input" type="text" placeholder="Введите ваш вопрос..." />
            <button class="search-btn" type="submit">
              <FontAwesomeIcon icon={faSearch} />
            </button>
          </div>
        </div>
      </section>

      <section class="about">
        <div class="pic" id="pic3" />
        <div class="pic" id="pic2" />
        <div class="pic" id="pic1" />
      </section>
    </div>
  );
}

