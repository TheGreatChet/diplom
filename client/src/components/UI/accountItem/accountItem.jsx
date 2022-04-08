import React from "react";
import classes from './accountItem.module.css'

const AccountItem = ({ item }) => {
    return (
        <div>
            <article class={classes.item}>
                <div class={classes.item__id}>{item.AccountId}</div>
                <div class={classes.item__content}>
                    <div class={classes.content}>
                        <p>{item.Login}</p>
                        <p>{item.Password}</p>
                        <p>{item.Role}</p>
                    </div>
                </div>
            </article>
        </div>
    )
}

export default AccountItem;