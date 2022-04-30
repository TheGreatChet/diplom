import React from "react";
import classes from "./MyButton.module.scss";

const myButton = ({ children, ...props }) => {
  return (
    <button {...props} className={classes.myBtn}>
      {children}
    </button>
  );
};

export default myButton;
