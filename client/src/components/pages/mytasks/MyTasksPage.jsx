import React, { useEffect, useState } from "react";
import "./MyTasksPage.scss";
import { MyList } from "../../common/MyList/MyList";
import { useHttp } from "../../../hooks/useHttp";
import { Loader } from "../../common/Loader/Loader";
import { useLocation } from "react-router-dom";

export const MyTasksPage = () => {
  const { request } = useHttp();

  const [data, setData] = useState({});
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    async function getData() {
      setLoading(true);
      const result = await request("/api/tasks/byclient/" + JSON.parse(localStorage.getItem("userData")).accountId, "GET");
      setData(result);
      setLoading(false);
    }
    getData();
  }, [request]);


  if (data) {
    return (
      <div className="list-container">
        <div className="list-sidebar"></div>
        {isLoading ? <Loader /> : <MyList items={data} />}
      </div>
    );
  } else {
    return (
      <div style={{height: 600}} className="list-container">        
        {isLoading ? <Loader /> : <h1 className="empty">У вас отсутствуют задачи</h1>}
      </div>
    );
  }
};