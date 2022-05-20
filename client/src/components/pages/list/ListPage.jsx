import React, { useEffect, useState } from "react";
import "./ListPage.scss";
import { MyList } from "../../common/MyList/MyList";
import { useHttp } from "../../../hooks/useHttp";
import { Loader } from "../../common/Loader/Loader";
import { useLocation } from "react-router-dom";

export const ListPage = () => {
  const { state } = useLocation();
  const { param } = state;
  const { request } = useHttp();

  const [data, setData] = useState({});
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    async function getData() {
      setLoading(true);
  
      const result = await request("/api/tasks/bydescr/".concat(param), "GET");
      setData(result);
      setLoading(false);
    }

    getData();
  }, [param, request]);


  if (data.length) {
    return (
      <div className="list-container">
        <div className="list-sidebar"></div>
        {isLoading ? <Loader /> : <MyList items={data} />}
      </div>
    );
  } else {
    return (
      <div style={{height: 600}} className="list-container">        
        {isLoading ? <Loader /> : <h1 className="empty">По запросу пусто</h1>}
      </div>
    );
  }
};