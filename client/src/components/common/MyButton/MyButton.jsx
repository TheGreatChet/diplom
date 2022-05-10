import React from "react";
import classes from "./MyButton.module.scss";

export const MyButton = ({ children, ...props }) => {
  return (
    <button {...props} className={classes.myBtn}>
      {children}
    </button>
  );
};