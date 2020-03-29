import React from "react";
import BurgerIngredients from "./BurgerIngredients/BurgerIngredients";
import classes from "./Burger.module.css";
import { withRouter } from 'react-router-dom'; //to pass props history, we use hoc from package....

const Burger = (props) => {
  // console.log("Burger:", props)
  //ingredients is in object, we need to convert it into an Array, so that we can apply map() on to it.

  let transformedIngredients = Object.keys(props.ingredients)
    .map((igKey, idx) => {
      return [...Array(props.ingredients[igKey])].map((_, i) => {
        return <BurgerIngredients key={igKey + i} type={igKey} />;
      });
    })
    .reduce((arr, el) => {
      return arr.concat(el);
    }, []);
    // reduce is the default javascript function-- 
  // console.log("Props received", transformedIngredients);

  if (transformedIngredients.length === 0){
      transformedIngredients = <p>Please start adding ingredients! </p>
  }
  return (
    <div className={classes.Burger}>
      <BurgerIngredients type="bread-top" />
      {transformedIngredients}
      <BurgerIngredients type="bread-bottom" />
    </div>
  );
};

export default withRouter(Burger);
