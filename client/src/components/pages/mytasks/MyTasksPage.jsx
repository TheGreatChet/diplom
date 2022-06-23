import React, { useEffect, useState } from "react";
import "./MyTasksPage.scss";
import { MyList } from "../../common/MyList/MyList";
import { useHttp } from "../../../hooks/useHttp";
import { Loader } from "../../common/Loader/Loader";
import { MyButton } from "../../common/MyButton/MyButton";
import { MyModal } from "../../common/MyModal/MyModal";
import { MyInput } from "../../common/MyInput/MyInput";
import { MyLargeInput } from "../../common/MyLargeInput/MyLargeInput"
import { MySelect } from "../../common/MySelect/MySelect"
import { toast } from "react-toastify";
import validator from 'validator';
import { useNavigate } from "react-router-dom";


export const MyTasksPage = () => {
  const { request } = useHttp();
  const [data, setData] = useState({});
  const [types, setTypes] = useState({});
  const [isLoading, setLoading] = useState(true);
  const [isCreateVisible, setCreateVisible] = useState(false);
  const [name, setName] = useState('')
  const [descr, setDescr] = useState('')
  const [auto, setAuto] = useState('')
  const [selType, setSelType] = useState('')
  const [time, setTime] = useState(Date.now())
  const navigate = useNavigate()

  async function getData() {
    setLoading(true);
    let result = ''
    if (JSON.parse(localStorage.getItem("userData")).roleId === 1) {
      result = await request("/api/tasks/byclient/" + JSON.parse(localStorage.getItem("userData")).accountId, "GET");
    } else if (JSON.parse(localStorage.getItem("userData")).roleId === 2) {
      result = await request("/api/tasks/byempl/" + JSON.parse(localStorage.getItem("userData")).accountId, "GET");
    } else {
      result = await request("/api/tasks/", "GET");
      result = result.filter(c => c.StatusId === 1);
    }
    setData(result);
    setLoading(false);
  }

  useEffect(() => {
    async function getData() {
      let result = ''
      if (JSON.parse(localStorage.getItem("userData")).roleId === 1) {
        result = await request("/api/tasks/byclient/" + JSON.parse(localStorage.getItem("userData")).accountId, "GET");
      } else if (JSON.parse(localStorage.getItem("userData")).roleId === 2) {
        result = await request("/api/tasks/byempl/" + JSON.parse(localStorage.getItem("userData")).accountId, "GET");
      } else {
        result = await request("/api/tasks/", "GET");
        result = result.filter(c => c.StatusId === 1);
      }
      setData(result);
      setLoading(false);
    }

    async function getTypes() {
      const result = await request("/api/type/");
      setTypes(result);
    }

    const interval = setInterval(async () => {
      setTime(Date.now())
      getData().then(getTypes());
    }, 5000)

    return () => {
      clearInterval(interval);
    }


  }, [request]);


  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async function sendTask() {
    await sleep(100)
    await request("/api/tasks/add", "POST", {
      title: name,
      descryption: descr,
      statusId: "1",
      car: auto,
      typeId: selType
    })
  }

  async function sendList() {
    const a = (await request("/api/tasks/getlast/last"))[0]["TaskId"]
    await sleep(200)
    await request("/api/tasklist/", "POST", {
      taskId: a,
      employeeId: 1,
      clientId: JSON.parse(localStorage.getItem("userData")).accountId
    });
  }

  async function saveHandler() {
    if (!name || !descr || !auto || !selType) {
      toast.error("Заполните все поля")
      return
    }
    if (!validator.isAlpha(name, ['ru-RU'], { ignore: ' -' }) || !validator.isAlpha(descr, ['ru-RU'], { ignore: ' -' }) || !validator.isAlpha(auto, ['ru-RU'], { ignore: ' -' })) {
      toast.error("Используйте только кириллицу");
      return;
    }
    if (selType === 0) {
      toast.error("Выберите тип")
      return
    }

    sendTask().then(await sleep(500)).then(sendList()).then(setCreateVisible(false)).then(toast.success("Успешно"));
  }

  if (JSON.stringify(data) !== '[]' && JSON.stringify(data) !== undefined && JSON.stringify(data) !== '{}' && types) {
    return (
      <div className="task-container">
        <div className="list-header">
          {JSON.parse(localStorage.getItem("userData")).roleId === 1 && (
            <MyButton style={{ width: 150 }} onClick={() => setCreateVisible(true)}>Создать вопрос</MyButton>
          )}
          {JSON.parse(localStorage.getItem("userData")).roleId === 1 && (
            <MyButton style={{ width: 150 }} onClick={() => { navigate('/search') }}>Поиск вопроса</MyButton>
          )}
          {JSON.parse(localStorage.getItem("userData")).roleId === 0 && (<h2>Обработка новых вопросов</h2>)}
          {JSON.parse(localStorage.getItem("userData")).roleId === 2 && (<h2>Обработка ваших вопросов</h2>)}

        </div>
        <div className="task-content">
          {isLoading ? <div style={{ display: 'flex', justifyContent: "center", marginTop: '180px' }}><Loader /></div> : <MyList items={data} upd={getData} />}
        </div>
        <MyModal
          title="Создание вопроса"
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
            <MySelect style={{ width: 200 }} onChange={(e) => { setSelType(e.target.value) }}>
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
          {JSON.parse(localStorage.getItem("userData")).roleId === 1 && (
            <MyButton style={{ width: 150 }} onClick={() => setCreateVisible(true)}>Создать вопрос</MyButton>
          )}
          {JSON.parse(localStorage.getItem("userData")).roleId === 1 && (
            <MyButton style={{ width: 150 }} onClick={() => { navigate('/search') }}>Поиск вопроса</MyButton>
          )}
          {JSON.parse(localStorage.getItem("userData")).roleId === 0 && (<h2>Обработка новых вопросов</h2>)}
          {JSON.parse(localStorage.getItem("userData")).roleId === 2 && (<h2>Обработка ваших вопросов</h2>)}
        </div>
        <div className="task-content" style={{ textAlign: "center" }}>
          {isLoading 
          ? 
          <div style={{ display: 'flex', justifyContent: "center", marginTop: '180px' }}>
            <Loader />
          </div> 
          : 
          <div>
            <h1 className="tasks-empty">У вас отсутствуют вопросы</h1>
            <h3>Создайте вопрос, используя кнопку выше</h3>
          </div>
          }
        </div>
        <MyModal
          title="Создание вопроса"
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
  }
};
