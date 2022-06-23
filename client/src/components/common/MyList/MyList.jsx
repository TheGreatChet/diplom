import React from "react";
import { MyListItem } from "./MyListItem/MyListItem";
import classes from "./MyList.module.scss";
import { format } from "date-fns";

export const MyList = ({ items, upd }) => {

  if (items != null) {
    return (
      <div className={classes.listContent}>
        {items.map((item, index) => {
          return (
            <MyListItem
              key={index}
              upd={upd}
              title={item.Title}
              descr={item.Descryption}
              taskId={item.TaskId}
              statusId={item.StatusId}
              statusName={item.StatusName}
              typeName={item.TypeName}
              emplId={item.EmplId}
              clientId={item.ClientId}
              time={format(Date.parse(item.Date), "dd/MM/yyyy")}
            />
          );
        })}
      </div>
    );
  } else {
    return (  
      <div style={{gridColumnStart: 2, height: 400, margin: 'auto', marginTop: '10%'}}>
        <h1>Ответов по вашему запросу не найдено!</h1>
      </div>
    )
  }
};
