import React, { useEffect, useState } from "react";
import "./ListPage.scss";
import { MyList } from "../../common/MyList/MyList";
import { useHttp } from "../../../hooks/useHttp";
import { Loader } from "../../common/Loader/Loader";
import { useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { MyButton } from "../../common/MyButton/MyButton";

export const ListPage = () => {
  const { state } = useLocation();
  const { param } = state;
  const { request } = useHttp();
  const navigate = useNavigate()

  const [data, setData] = useState({});
  const [isLoading, setLoading] = useState(true);
  const [req, setReq] = useState(param)

  useEffect(() => {
    async function getData() {
      setLoading(true);
      const result = await request("/api/tasks/bydescr/".concat(req), "GET");
      setData(result);
      setLoading(false);
    }

    getData();
  }, [param, request]);

  async function search() {
    const result = await request("/api/tasks/bydescr/".concat(req), "GET");
    setData(result)
  }


  if (data.length) {
    return (
      <div className="list-wrap">
        <div className="list-sidebar">
          <input
            className="list-search-input"
            type="text"
            placeholder="Введите ваш вопрос..."
            value={req}
            onChange={(e) => {
              setReq(e.target.value);
            }}
          />
          <button className="list-search-btn" type="submit" onClick={search}>
            <FontAwesomeIcon icon={faSearch} />
          </button>
        </div>
        <div className="list-container">
          <MyList items={data} />
        </div>
      </div>
    );
  } else {
    return (
      <div className="list-wrap">
        <div className="list-sidebar">
          <input
            className="list-search-input"
            type="text"
            placeholder="Введите ваш вопрос..."
            value={req}
            onChange={(e) => {
              setReq(e.target.value);
            }}
          />
          <button className="list-search-btn" type="submit" onClick={search}>
            <FontAwesomeIcon icon={faSearch} />
          </button>
        </div>
        <div className="list-container" style={{ height: 600 }}>
          {isLoading ? <Loader /> :
            <div style={{display: 'flex', flexDirection: 'column', margin: 'auto', gridColumnStart: 2}}>
              <h1>По запросу пусто</h1>
              <MyButton style={{ alignSelf: 'center', width: 150, height: 50 }} onClick={() => { navigate('/') }}>
                <h2 style={{ padding: 0, margin: 0 }}>Назад</h2>
              </MyButton>
            </div>}
        </div>
      </div>
    );
  }
};