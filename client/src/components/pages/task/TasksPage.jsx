import React, { useState } from "react";
import "./TasksPage.scss";
import "../../common/MyButton/MyButton";
import { MyButton } from "../../common/MyButton/MyButton";
import { MyList } from "../../common/MyList/MyList";
import { MyModal } from "../../common/MyModal/MyModal";
import { MyInput } from "../../common/MyInput/MyInput";
import { MyLargeInput } from "../../common/MyLargeInput/MyLargeInput";
import { MySelect } from "../../common/MySelect/MySelect";

export const TasksPage = () => {
  const [isCreate, setCreate] = useState(false);
  const [isChangeStatus, setChangeStatus] = useState(false);

  return (
    <div className="tasks">
      <div className="tasks-body">
        <div className="tasks-body-header">
          <MyButton
            onClick={() => setCreate(true)}
            style={{ width: 160 }}>
            Создать вопрос
          </MyButton>
        </div>
        <div className="tasks-body-content">
          <MyList />
        </div>
      </div>
      <MyModal
        title="Добавление вопроса"
        visible={isCreate}
        setVisible={setCreate}>
        <div className="tasks-create-form">
          <label className="tasks-create-form-label" htmlFor="name">
            Название
          </label>
          <MyInput id="name" style={{ width: 400 }} />
          <label className="tasks-create-form-label" htmlFor="car">
            Данные об авто
          </label>
          <MyInput id="car" style={{ width: 400 }} />
          <label className="tasks-create-form-label" hrmlFor="type">
            Тип поломки
          </label>
          <MySelect id="type" style={{ width: 400 }} />
          <div className="tasks-create-form-content">
            <label className="tasks-create-form-label" htmlFor="descr">
              Вопрос
            </label>
            <MyLargeInput style={{ height: 100, width: 450 }} id="descr" />
            <input className="tasks-create-form-file" type="file"></input>
          </div>
          <MyButton style={{ marginTop: 10 }}>Создать</MyButton>
        </div>
      </MyModal>

      <MyModal
        title="Изменение статуса"
        visible={isChangeStatus}
        setVisible={setChangeStatus}>
        <div className="tasks-change-status-content">
          <div className="set-horizontal">
            <div style={{ marginRight: 10 }}>Текущий статус -</div>
            <div>{}</div>
          </div>
          <div className="set-horizontal" style={{marginTop: 20}}>
            <label style={{marginRight: 20}}>Новый статус</label>
            <MySelect style={{width: 150}}></MySelect>
          </div>
          <MyButton style={{marginTop: 20}}>Сохранить</MyButton>
        </div>
      </MyModal>
    </div>
  );
};
