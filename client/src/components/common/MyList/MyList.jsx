import React from "react";
import { MyListItem } from "./MyListItem/MyListItem";
import classes from "./MyList.module.scss";
import { format } from "date-fns";

export const MyList = ({ items }) => {
  if (items != null) {
    return (
      <div className={classes.listContent}>
        {items.map((item) => {
          return (
            <MyListItem
              key={item.TaskId}
              title={item.Title}
              descr={item.Descryption}
              time={format(Date.parse(item.Date), "dd/MM/yyyy")}
            />
          );
        })}
      </div>
    );
  } else {
    return <h1>Ответов по вашему запросу не найдено!</h1>;
  }
};
