import React from "react";
import classes from './MyListItem.module.scss'
import { ChatLeftFill } from "react-bootstrap-icons";

export const MyListItem = ({title, descr, time}) => {
  return (
    <div className={classes.listElement}>
      <div className={classes.listElementR1}>
        <h3>{title}</h3>
      </div>
      <div className={classes.listElementR2}>
        <h5>
          {descr}
        </h5>
      </div>
      <div className={classes.listElementR3}>
        <ChatLeftFill style={{ margin: 5 }} />
        <h6>Чат</h6>
        <h6 id={classes.date}>{time}</h6>
      </div>
    </div>
  );
};
