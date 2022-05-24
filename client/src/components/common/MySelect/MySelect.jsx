import React from 'react'
import classes from './MySelect.module.scss'

export const MySelect = ({...props}) => {
    return (
        <select {...props} className={classes.mySelect}>

        </select>
    );
};
