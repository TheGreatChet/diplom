import React from 'react'
import classes from './MyLargeInput.module.scss'

export const MyLargeInput = ({...props}) => {
    return (
        <textarea {...props} className={classes.largeInput}>

        </textarea>
    )
};
