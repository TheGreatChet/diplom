import React, { useEffect, useState } from "react";
import "./ListPage.scss";
import { MyList } from "../../common/MyList/MyList";
import { useHttp } from "../../../hooks/useHttp";
import { Loader } from "../../common/Loader/Loader";
import { useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { MyButton } from "../../common/MyButton/MyButton";
import { toast } from "react-toastify";
import { useMemo } from "react";

export const ListPage = () => {
  const { state } = useLocation();
  const [parametr, setParametr] = useState('')
  const [req, setReq] = useState('')
  
  useMemo(() => {
    if (state) {
      const { param } = state;
      setParametr(param)
    }
    if (parametr) setReq(parametr)
  }, [state, parametr, setReq, setParametr])

  console.log(req)
  const { request } = useHttp();
  const navigate = useNavigate()

  const [data, setData] = useState({});
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    if (isLoading) {
      async function getData() {
        const result = await request("/api/tasks/bydescr/".concat(req), "GET");
        setData(result);
        setLoading(false);
      }
      getData();
    }
  }, [req, request]);

  async function search() {
    if (!req) {
      toast.error('Заполните поле поиска')
      return;
    }
    const result = await request("/api/tasks/bydescr/".concat(req), "GET");
    setData(result)
  }

  if (JSON.stringify(data) !== '[]' && JSON.stringify(data) !== undefined && JSON.stringify(data) !== '{}') {
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
        <div className="list-container" style={{ minHeight: 600 }}>
          <MyList items={data}/>
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