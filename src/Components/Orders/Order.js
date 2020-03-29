import React from "react";
import classes from "./Order.module.css";
const Order = (props) => {
  // console.log("PROPS:", props);
  const ingredients = [];

  for (let ingredientName in props.ingredients) {
    ingredients.push({
      Name: ingredientName,
      Amount: props.ingredients[ingredientName]
    });
  }

  const ingredientOutput = ingredients.map((ig) => {
    return (
      <span
        style={{
          textTransform: "capitalize",
          margin: "2px 8px",
          display: "inline-block",
          border: "1px solid #ccc",
          padding: "5px"
        }}
        key={ig.Name}
      >
        {ig.Name} : ({ig.Amount})
      </span>
    );
  });
  return (
    <div className={classes.Order}>
      <p>Ingredients : {ingredientOutput}</p>
      <p>
        Price : <strong>Rs. {props.price.toFixed(2)}</strong>
      </p>
    </div>
  );
};

export default Order;
