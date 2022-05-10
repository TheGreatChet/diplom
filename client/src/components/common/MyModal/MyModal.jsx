import React from "react";
import classes from "./MyModal.module.scss";

export const MyModal = ({ children, visible, setVisible, title }) => {
  const rootClasses = [classes.modal];
  if (visible) {
    rootClasses.push(classes.modalActive);
    document.body.style.overflow = "hidden";

    if(document.getElementById("App")) document.getElementById("App").style.overflow = "hidden";
  } else {
    document.body.style.overflow = "unset";
    if(document.getElementById("App")) document.getElementById("App").style.overflow = "unset";
  }

  return (
    <div className={rootClasses.join(" ")} onClick={() => setVisible(false)}>
      <div
        className={classes.modalContent}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={classes.modalHeader}>
          <h4 className={classes.modalTitle}>{title}</h4>
        </div>
        <div className={classes.modalBody}>{children}</div>
      </div>
    </div>
  );
};
