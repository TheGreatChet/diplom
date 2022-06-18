import React, { useState } from "react";
import classes from './MyListItem.module.scss'
import { useNavigate } from "react-router-dom";
import { MySelect } from "../../MySelect/MySelect";
import { useEffect } from "react";
import { useHttp } from "../../../../hooks/useHttp";
import { toast } from "react-toastify";
import { MyModal } from "../../MyModal/MyModal";

export const MyListItem = ({ title, descr, time, taskId, statusId, stats, emplId, upd, statusName, typeName, clientId }) => {
  const navigate = useNavigate();
  const { request } = useHttp();
  const [statuses, setStatuses] = useState({ stats })
  const [curStatus, setCurStatus] = useState(statusId)
  const [empl, setEmpl] = useState()
  const [curEmpl, setCurEmpl] = useState(emplId);
  const [modal, setModal] = useState(false)


  async function goToChat() {
    if (localStorage.getItem("userData") == null) {
      navigate("/chat", { state: { param: taskId, title: title, statusId, emplId, clientId } });
      return;
    }

    if ((JSON.parse(localStorage.getItem("userData")).roleId !== 0)) {
      navigate("/chat", { state: { param: taskId, title: title, statusId } });
    } else {
      setModal(true)
    }
  }

  useEffect(() => {
    async function getEmpl() {
      let result = await request("/api/employee/");
      result = result.filter(c => c.RoleId !== 0)
      setEmpl(result)
    }

    async function getStatus() {
      const result = await request("/api/status/");
      setStatuses(result)
    }

    getStatus()
    getEmpl()
  }, [request, setEmpl, setStatuses])

  return (
    <div>
      <MyModal visible={modal} setVisible={setModal} title='Проверка заявки'>
        <div>
          <h3>Заголовок: {title}</h3>
          <h3>Описание: {descr}</h3>
          {statuses && empl && (
            <div className={classes.listitemModalwrap}>
              <h5 style={{ marginRight: 10, padding: 0, alignSelf: 'center' }}>Статус</h5>
              <MySelect style={{ width: 160 }} value={curStatus} onChange={async (e) => {
                if (e.target.value === '2') {
                  if (curEmpl === 0) {
                    toast.error('Назначьте сотрудника')
                    return;
                  }
                } else if (e.target.value === '4') {
                  const send = await request("/api/taskchat/sendmessage", "POST", {
                    text: 'Ваш вопрос получил статус "Отменён". Пожалуйста, введите нормальные данные и составьте новый вопрос.\nПростите за неудобства.',
                    taskId: taskId,
                    senderId: JSON.parse(localStorage.getItem("userData")).accountId
                  });
                }
                setCurStatus(e.target.value)
                await request("/api/tasks/changestatus/" + taskId, 'PUT', {
                  statusId: e.target.value
                });
                toast.success('Статус изменён')
                upd()
                setModal(false)
              }}>
                {Array.from(statuses).map((status, index) => {
                  return (
                    <option key={index} value={status.StatusId}>{status.Name}</option>
                  )
                })}
              </MySelect>

              <h5 style={{ marginLeft: 20, marginRight: 10, padding: 0, alignSelf: 'center' }}>Сотрудник</h5>
              <MySelect style={{ width: 180 }} value={curEmpl} onChange={async (e) => {
                setCurEmpl(e.target.value)
                await request("/api/tasklist/changeempl/" + taskId, 'PUT', {
                  emplId: e.target.value
                });
                if (e.target.value !== '0') {
                  toast.success('Сотрудник назначен')
                }
              }}>
                {Array.from(empl).map((em, index) => {
                  return (
                    <option key={index} value={em.EmplId}>{em.Name + " " + em.Surname}</option>
                  )
                })}
              </MySelect>
            </div>)}
        </div>
      </MyModal>
      <div className={classes.listElement} onClick={goToChat}>
        <div className={classes.listElementR1}>
          <h3>Заголовок: {title}</h3>
        </div>
        <div className={classes.listElementR2}>
          <h5>Описание: {descr}</h5>
        </div>
        <div className={classes.listElementR3}>
          <h6 style={{ marginLeft: 0 }} id={classes.date}>Дата: {time}</h6>
        </div>
        <div className={classes.listElementR4}>
          <h5>Текущий статус: {statusName}</h5>
          <h5>Тип поломки: {typeName}</h5>
        </div>
      </div>
    </div>
  );
  // }
};
