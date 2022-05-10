import React from "react";
import classes from "./MyInput.module.scss";

export const MyInput = ({placeholder, ...props}) => {
    return (
        <input {...props} placeholder={placeholder} className={classes.myInput}/>
    );
};
