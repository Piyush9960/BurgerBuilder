import React from "react";
import classses from "./BuildControl.module.css";

const BuildControl = (props) => {
  return (
    <div className={classses.BuildControl}>
      <div className={classses.Label}>{props.label}</div>
      <button disabled={props.disabled} onClick={props.remove} className={classses.Less}>Less</button>
      <button onClick={props.added} className={classses.More}>
        More
      </button>
    </div>
  );
};

export default BuildControl;
