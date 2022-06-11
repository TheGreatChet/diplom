import React from "react";
import classes from './MyListItem.module.scss'
import { useNavigate } from "react-router-dom";

export const MyListItem = ({title, descr, time, taskId}) => {
  const navigate = useNavigate();

  async function goToChat () {
    navigate("/chat", { state: { param: taskId, title: title } });
  }

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
        <h6 id={classes.date}>{time}</h6>
      </div>
    </div>
  );
};
