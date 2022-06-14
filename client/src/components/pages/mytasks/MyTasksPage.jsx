import React, { useEffect, useState } from "react";
import "./MyTasksPage.scss";
import { MyList } from "../../common/MyList/MyList";
import { useHttp } from "../../../hooks/useHttp";
import { Loader } from "../../common/Loader/Loader";
import { useLocation } from "react-router-dom";
import { MyButton } from "../../common/MyButton/MyButton";
import { MyModal } from "../../common/MyModal/MyModal";
import { MyInput } from "../../common/MyInput/MyInput";
import { MyLargeInput } from "../../common/MyLargeInput/MyLargeInput"
import { MySelect } from "../../common/MySelect/MySelect"
import { toast } from "react-toastify";
import { useContext } from "react";
import { AuthContext } from '../../../context/AuthContext'

export const MyTasksPage = () => {
  const auth = useContext(AuthContext);
  const { request } = useHttp();
  const [data, setData] = useState({});
  const [types, setTypes] = useState({});
  const [isLoading, setLoading] = useState(true);
  const [isCreateVisible, setCreateVisible] = useState(false);
  const [name, setName] = useState('')
  const [descr, setDescr] = useState('')
  const [auto, setAuto] = useState('')
  const [typeId, setType] = useState('')
  const [selType, setSelType] = useState('')
  const [curTask, setCurTask] = useState(0)

  async function getData() {
    setLoading(true);
    let result = ''
    if (JSON.parse(localStorage.getItem("userData")).roleId == 1) {
      result = await request("/api/tasks/byclient/" + JSON.parse(localStorage.getItem("userData")).accountId, "GET");
    } else {
      result = await request("/api/tasks/byempl/" + JSON.parse(localStorage.getItem("userData")).accountId, "GET");
    }
    setData(result);
    setLoading(false);
  }

  async function getTypes() {
    const result = await request("/api/type/");
    setTypes(result);
  }


  useEffect(() => {
    getData().then(getTypes()).then(getLast());
  }, []);

  function update() {
    getData().then(getTypes()).then(getLast());
  }

  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async function sendTask() {
    await sleep(100)
    const result = await request("/api/tasks/add", "POST", {
      title: name,
      descryption: descr,
      statusId: "1",
      car: auto,
      typeId: selType
    })
  }

  async function getLast() {
    await sleep(200)
    const a = (await request("/api/tasks/getlast/last"))[0]["TaskId"]
    setCurTask(a);
  }

  async function sendList() {
    await sleep(100)
    const list = await request("/api/tasklist/", "POST", {
      taskId: curTask,
      employeeId: 1,
      clientId: JSON.parse(localStorage.getItem("userData")).accountId
    });
  }

  async function saveHandler() {
    if (!name || !descr || !auto || !selType) {
      toast.error("Заполните все поля")
      return
    }

    if (selType == 0) {
      toast.error("Выберите тип")
      return
    }

    sendTask().then(sendList()).then(await sleep(500)).then(update()).then(setCreateVisible(false)).then(toast.success("Успешно"));
  }

  if (data.length && types) {
    return (
      <div className="task-container">
        <div className="list-header">
        {JSON.parse(localStorage.getItem("userData")).roleId == 1 && (
          <MyButton style={{ width: 150 }} onClick={() => setCreateVisible(true)}>Создать задачу</MyButton>)}
        </div>
        <div className="task-content">
          {isLoading ? <div style={{display: 'flex', justifyContent: "center", marginTop: '180px'}}><Loader /></div> : <MyList items={data} />}
        </div>
        <MyModal
          title="Создание задачи"
          visible={isCreateVisible}
          setVisible={setCreateVisible}>
          <div className="create-container">
            <label>Название</label>
            <MyInput style={{ margin: 5, width: 300 }} value={name} onChange={(e) => setName(e.target.value)} />
            <label style={{ marginTop: 10 }}>Описание</label>
            <MyLargeInput style={{ height: 100, width: 300, margin: 5 }} value={descr} onChange={(e) => setDescr(e.target.value)} />
            <label style={{ marginTop: 10 }}>Информация по авто</label>
            <MyInput style={{ margin: 5, width: 300 }} value={auto} onChange={(e) => setAuto(e.target.value)} />
            <label style={{ marginTop: 10 }}>Тип поломки</label>
            <MySelect style={{ width: 300 }} onChange={(e) => { setSelType(e.target.value) }}>
              <option key="0" value="0">Выберите тип</option>
              {Array.from(types).map((type, index) => {
                return (
                  <option key={index} value={type.TypeId}>{type.Name}</option>
                )
              })}
            </MySelect>
              <MyButton style={{ margin: 20 }} onClick={saveHandler}>Создать</MyButton>
          </div>
        </MyModal>
      </div>
    );
  } else {
    return (
      <div className="task-container">
        <div className="list-header">
        </div>
        <div className="task-content" style={{ textAlign: "center" }}>
          {isLoading ? <div style={{display: 'flex', justifyContent: "center", marginTop: '180px'}}><Loader /></div> : <h1 className="tasks-empty">У вас отсутствуют задачи</h1>}
        </div>
      </div>
    );
  }
};