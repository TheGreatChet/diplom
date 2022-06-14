import React, { useState } from "react";
import classes from './MyListItem.module.scss'
import { useNavigate } from "react-router-dom";
import { MySelect } from "../../MySelect/MySelect";
import { useEffect } from "react";
import { useHttp } from "../../../../hooks/useHttp";
import { toast } from "react-toastify";

export const MyListItem = ({title, descr, time, taskId, statusId}) => {
  const navigate = useNavigate();
  const { request } = useHttp();
  const [statuses, setStatuses] = useState({})
  const [curStatus, setCurStatus] = useState(statusId)

  async function goToChat () {
    if (JSON.parse(localStorage.getItem("userData")).roleId != '0') {
      navigate("/chat", { state: { param: taskId, title: title } });
    }
  }
  
  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async function getStatus() {
    const result = await request("/api/status/");
    setStatuses(result);
  }

  useEffect(() => {
    getStatus()
  }, [])

  return (
    <div className={classes.listElement} onClick={goToChat}>
      <div className={classes.listElementR1}>
        <h3>{title}</h3>
      </div>
      <div className={classes.listElementR2}>
        <h5>
          {descr}
        </h5>
      </div>
      <div className={classes.listElementR3}>
        <h5 style={{marginRight: 10, paddingкы: 0}}>Статус</h5>
        <MySelect value={curStatus} onChange={async (e) => {
              setCurStatus(e.target.value)
              const result = await request("/api/tasks/changestatus/" + taskId, 'PUT', {
                statusId: e.target.value
              });
              toast.success('Статус изменён')
        }}>
          {Array.from(statuses).map((status, index) => {
            return (
              <option key={index} value={status.StatusId}>{status.Name}</option>
            )
          })}
        </MySelect>
        <h6 id={classes.date}>{time}</h6>
      </div>
    </div>
  );
};
