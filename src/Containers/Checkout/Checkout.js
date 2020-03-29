import React, { Component } from "react";
import CheckoutSummary from "../../Components/Orders/CheckoutSummary/CheckoutSummary";
import ContactData from "./ContactData/ContactData";
import { Route, Redirect } from "react-router-dom";
import { NotificationContainer } from "react-notifications";
import { connect } from "react-redux";
// import * as actions from "../../Components/store/actions/index";

class Checkout extends Component {
  // componentWillMount() {
  //   this.props.onInitPurchase();
  // }

  // componentWillMount() {
  //   //#####  Extracting queryParams  ######
  //   const query = new URLSearchParams(this.props.location.search);
  //   let ingredients = {};
  //   let price = 0;
  //   for (let param of query.entries()) {
  //     /*params will be:['salad', '1']
  //           ## We will access:
  //                params[0] => 'salad  &&& params[1] => '1'
  //       */
  //     // --prefix of plus, converts to a number
  //     if (param[0] === "price") {
  //       price = param[1];
  //     }
  //     ingredients[param[0]] = +param[1];

  //     console.log("Query:", param);
  //   }
  //   this.setState({
  //     ingredients: ingredients,
  //     totalPrice: price
  //   });
  // }

  checkoutCancelledHandler = () => {
    this.props.history.goBack();
  };

  checkoutContinuedHandler = () => {
    // alert("You continued..")
    this.props.history.replace("/checkout/contact-data");
  };

  render() {
    let summary = <Redirect to="/" />;
    if (this.props.ing) {
      const purchasedRedirect = this.props.purchased ? (
        <Redirect to="/" />
      ) : null;
      summary = (
        <>
          {purchasedRedirect}
          <CheckoutSummary
            ingredients={this.props.ing}
            checkoutContinued={this.checkoutContinuedHandler}
            checkoutCancelled={this.checkoutCancelledHandler}
          />
          <Route
            exact
            path={this.props.match.path + "/contact-data"}
            component={ContactData}
          />
        </>
      );
    }
    return (
      <div>
        {summary}

        <NotificationContainer />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ing: state.burgerBuilder.ingredients,
    purchased: state.order.purchased
    // price: state.burgerBuilder.totalPrice
  };
};

// const mapDispatchToProps = (dispatch) => {
//   return {
//     onInitPurchase: () => dispatch(actions.purchaseInit())
//   };
// };

export default connect(mapStateToProps)(Checkout);
