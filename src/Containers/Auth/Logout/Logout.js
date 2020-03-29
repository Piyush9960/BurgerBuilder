import React, { Component } from "react";
import * as actions from "../../../Components/store/actions/index";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

class Logout extends Component {
  state = {};

  componentDidMount() {
    this.props.onLogout();
  }

  render() {
    return<Redirect to="/" />;
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onLogout: () => dispatch(actions.logout())
  };
};

export default connect(null, mapDispatchToProps)(Logout);
