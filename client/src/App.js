import React from "react";
import "./assets/css/App.scss";
import Header from "./components/header/Header";
import "./assets/images/search-background-1.jpg";
import "./assets/images/search-background-2.jpeg";
import "./assets/images/search-background-3.jpeg";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

function App() {
  return (
    <div className="App">
      <Header />
      <div class="search-container">
        <div class="search">
          <input class="search-input" type="text" placeholder="Введите ваш вопрос..."/>
          <button class="search-btn" type="submit">
            <FontAwesomeIcon icon={faSearch}/>
          </button>
        </div>
        <div class="pic" id="pic3" />
        <div class="pic" id="pic2" />
        <div class="pic" id="pic1" />
      </div>
    </div>
  );
}

export default App;
