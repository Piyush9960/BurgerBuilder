import React from "react";
import "./App.css";
import BurgerBuilder from "./Containers/BurgerBuilder/BurgerBuilder";
import Layout from "./hoc/Layout/Layout";
import Checkout from "./Containers/Checkout/Checkout";
import { Route, Switch, withRouter, Redirect } from "react-router-dom";
import MyOrders from "./Containers/MyOrders/MyOrders";
import { AnimatedSwitch } from "react-router-transition";
import Auth from "./Containers/Auth/Auth";
import Logout from "./Containers/Auth/Logout/Logout";
import * as actions from "./Components/store/actions/index";
import { connect } from "react-redux";
// import ContactData from "./Containers/Checkout/ContactData/ContactData";
/* 
1. Components folder- Are the one which dont use the state | Stateless components
2. Container are the one which use state | called stetefull components.

*/

class App extends React.Component {
  componentDidMount() {
    this.props.onTryAutoSignUp();
  }
  render() {
    let routes = (
      <Switch>
        <Route path="/auth" component={Auth} />
        <Route path="/" component={BurgerBuilder} />
        <Redirect to="/" />
      </Switch>
    );
    if (this.props.isAuthenticated) {
      routes = (
        <AnimatedSwitch
        atEnter={{ opacity: 0 }}
        atLeave={{ opacity: 0 }}
        atActive={{ opacity: 1 }}
      >
          <Route path="/checkout" component={Checkout} />
          <Route path="/orders" component={MyOrders} />
          <Route path="/logout" component={Logout} />
          <Route path="/" component={BurgerBuilder} />
          <Redirect to="/" />
        </AnimatedSwitch>
      );
    }
    return (
      <div>
        <Layout>
          {/* <AnimatedSwitch
            atEnter={{ opacity: 0 }}
            atLeave={{ opacity: 0 }}
            atActive={{ opacity: 1 }}
          > */}
          {routes}
          {/* </AnimatedSwitch> */}
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onTryAutoSignUp: () => dispatch(actions.authCheckState())
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
