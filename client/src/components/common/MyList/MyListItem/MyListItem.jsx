import React, { useState } from "react";
import classes from './MyListItem.module.scss'
import { useNavigate } from "react-router-dom";
import { MySelect } from "../../MySelect/MySelect";
import { useEffect } from "react";
import { useHttp } from "../../../../hooks/useHttp";
import { toast } from "react-toastify";

export const MyListItem = ({ title, descr, time, taskId, statusId, stats, emplId }) => {
  const navigate = useNavigate();
  const { request } = useHttp();
  const [statuses, setStatuses] = useState({ stats })
  const [curStatus, setCurStatus] = useState(statusId)
  const [empl, setEmpl] = useState()
  const [curEmpl, setCurEmpl] = useState(emplId);

  async function goToChat() {
    if (JSON.parse(localStorage.getItem("userData")).roleId !== '0') {
      navigate("/chat", { state: { param: taskId, title: title } });
    }
  }

  useEffect(() => {
    async function getEmpl() {
      const result = await request("/api/employee/");
      setEmpl(result)
    }

    async function getStatus() {
      const result = await request("/api/status/");
      setStatuses(result)
    }

    getStatus()
    getEmpl()
  }, [request, setEmpl, setStatuses])


  if (empl && statuses) {
    return (
      <div className={classes.listElement} 
      // onClick={goToChat}
      >
        <div className={classes.listElementR1}>
          <h3>{title}</h3>
        </div>
        <div className={classes.listElementR2}>
          <h5>
            {descr}
          </h5>
        </div>
        <div className={classes.listElementR3}>
          <h5 style={{ marginRight: 10, padding: 0 }}>Статус</h5>
          <MySelect style={{ width: 160 }} value={curStatus} onChange={async (e) => {
            if (e.target.value === '2') {              
              if (curEmpl === 0) {
                toast.error('Назначьте сотрудника')
                return;
              }
            }
            setCurStatus(e.target.value)
            await request("/api/tasks/changestatus/" + taskId, 'PUT', {
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

          <h5 style={{ marginLeft: 20, marginRight: 10, padding: 0 }}>Сотрудник</h5>
          <MySelect style={{ width: 180 }} value={curEmpl} onChange={async (e) => {
            setCurEmpl(e.target.value)
            await request("/api/tasklist/changeempl/" + taskId, 'PUT', {
              emplId: e.target.value
            });
            toast.success('Сотрудник назначен')
          }}>
            {Array.from(empl).map((em, index) => {
              return (
                <option key={index} value={em.EmplId}>{em.Name + " " + em.Surname}</option>
              )
            })}
          </MySelect>
          <h6 style={{marginLeft: 5}} id={classes.date}>{time}</h6>
        </div>
      </div>
    );
  }
};
