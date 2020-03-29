import React from "react";
import NavigationItem from "./NavigationItem/NavigationItem";
import classes from "./NavigationItems.module.css";
// import { useHistory } from "react-router-dom";

const NavigationItems = (props) => {
  // let history = useHistory();
  // console.log(history, "History");
  return (
    <ul className={classes.NavigationItems}>
      <NavigationItem
        link="/"
        exact
        // active={history.location.pathname === "/"}
      >
        {" "}
        Burger-Builder{" "}
      </NavigationItem>

      {props.isAuth && (
        <NavigationItem link="/orders">My-Orders </NavigationItem>
      )}

      {!props.isAuth ? (
        <NavigationItem link="/auth">AUTHENTICATION</NavigationItem>
      ) : (
        <NavigationItem link="/logout">Logout</NavigationItem>
      )}
    </ul>
  );
};

export default NavigationItems;
