import React, { useContext } from "react";
import AccountItem from "./UI/accountItem/accountItem.jsx";

const AccountList = ({items}) => {
    return (
        <div>
            {items.map(item =>
                <AccountItem item={item} key={item.AccountId} />
            )}
        </div>
    )
};

export default AccountList;