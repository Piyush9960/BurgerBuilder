import React from "react";
import classes from "./BuildControls.module.css";
import BuildControl from "./BuildControl/BuildControl";
const constrols = [
  {
    label: "Salad",
    type: "salad"
  },
  {
    label: "Bacon",
    type: "bacon"
  },
  {
    label: "Cheese",
    type: "cheese"
  },
  {
    label: "Meat",
    type: "meat"
  }
];

const BuildControls = (props) => {
  return (
    <div className={classes.BuildControls}>
      <p>
        Current Price: <strong>₹ {props.price.toFixed(2)}</strong>
      </p>
      {constrols.map((cntrl) => (
        <BuildControl
          key={cntrl.label}
          label={cntrl.label}
          added={() => props.ingredientAdded(cntrl.type)}
          remove={() => props.ingredientRemove(cntrl.type)}
          disabled={props.disabled[cntrl.type]}
        />
      ))}
      <button
        disabled={!props.purchasable}
        className={classes.OrderButton}
        onClick={props.ordered}
      >
        {props.isAuthenticated ? "ORDER NOW" : "SIGN UP TO ORDER"}
        
      </button>
    </div>
  );
};

export default BuildControls;
