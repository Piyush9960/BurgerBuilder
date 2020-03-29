import React, { Component } from "react";
import Aux from "../../hoc/AuxComponent/Aux";
import Burger from "../../Components/Burger/Burger";
import BuildControls from "../../Components/Burger/BuildControls/BuildControls";
import Modal from "../../Components/UI/Modal/Modal";
import OrderSummary from "../../Components/Burger/OrderSummary/OrderSummary";
import axios from "../../axios-orders";
import Spinner from "../../Components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import Transition from "react-transition-group/Transition";
import { connect } from "react-redux";
import * as burgerBuilderActions from "../../Components/store/actions/index";

class BurgerBuilder extends Component {
  state = {
    // totalPrice: 10,
    purchasable: false,
    purchasing: false
  };

  componentDidMount() {
    this.props.onInitIngredients(this.props.token);
  }

  updatePurchaseState(ingredients) {
    const sum = Object.keys(ingredients)
      .map((igKey) => {
        return ingredients[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);

    return sum > 0;
  }

  // addIngredientHandler = (type) => {
  //   const oldCount = this.state.ingredients[type];
  //   if (oldCount >= 5) {
  //     alert("You can add each ingredient up to 5");
  //     return;
  //   }
  //   const updatedCount = oldCount + 1;
  //   const updatedIngredients = {
  //     ...this.state.ingredients
  //   };
  //   updatedIngredients[type] = updatedCount;
  //   const priceAddition = INGREDIENT_PRICES[type];
  //   const oldPrice = this.props.price;
  //   const newPrice = oldPrice + priceAddition;
  //   this.setState({
  //     ingredients: updatedIngredients,
  //     totalPrice: newPrice
  //   });
  //   this.updatePurchaseState(updatedIngredients);
  // };

  // removeIngredientHamdler = (type) => {
  //   const oldCount = this.state.ingredients[type];
  //   if (oldCount <= 0) {
  //     return;
  //   }
  //   const updatedCount = oldCount - 1;
  //   const updatedIngredients = {
  //     ...this.state.ingredients
  //   };
  //   updatedIngredients[type] = updatedCount;
  //   const priceDeduction = INGREDIENT_PRICES[type];
  //   const oldPrice = this.props.price;
  //   const newPrice = oldPrice - priceDeduction;
  //   this.setState({
  //     ingredients: updatedIngredients,
  //     totalPrice: newPrice
  //   });
  //   this.updatePurchaseState(updatedIngredients);
  // };

  purchaseHandler = () => {
    if (this.props.isAuthenticated){

      this.setState({
        purchasing: true
      });
    } else {
      this.props.onSetRedirectPath('/checkout')
      this.props.history.push('/auth')
    }
  };

  purchaseCancelHandler = () => {
    this.setState({
      purchasing: false
    });
  };

  // //####### pass data in query params -LOGIC   #######
  // purchaseContinueHandle = () => {
  //   const queryParams = [];
  //   for (let i in this.state.ingredients) {
  //     //encodeURIComponent js function to encode the string for queryParams..
  //     queryParams.push(
  //       encodeURIComponent(i) +
  //         "=" +
  //         encodeURIComponent(this.state.ingredients[i])
  //     );
  //   }
  //   queryParams.push("price=" + this.props.price);
  //   const queryString = queryParams.join("&");
  //   this.props.history.push({
  //     pathname: "/checkout",
  //     search: "?" + queryString
  //   });
  // };

  purchaseContinueHandler = () => {
    this.props.onInitPurchase();
    this.props.history.push("/checkout");
  };

  render() {
    //Disabled button logic
    const disabledInfo = {
      ...this.props.ing
    };
    for (let keys in disabledInfo) {
      disabledInfo[keys] = disabledInfo[keys] <= 0;
    }
    // salad: true, bacon:false, meat: false ... etc...

    let orderSummary = null;

    let burger = this.props.error ? (
      <p>ingredients Can't be loaded . . .</p>
    ) : (
      <Spinner />
    );
    if (this.props.ing) {
      burger = (
        <Aux>
          <Burger ingredients={this.props.ing} />
          <BuildControls
            ingredientAdded={this.props.onIngredientAdded}
            ingredientRemove={this.props.onIngredientRemoved}
            disabled={disabledInfo}
            price={this.props.price}
            purchasable={this.updatePurchaseState(this.props.ing)}
            ordered={this.purchaseHandler}
            isAuthenticated={this.props.isAuthenticated}
          />
        </Aux>
      );
      orderSummary = (
        <OrderSummary
          purchaseCancelHandler={this.purchaseCancelHandler}
          // pass data in query params -LOGIC
          purchaseContinueHandler={this.purchaseContinueHandler}
          ingredients={this.props.ing}
          totalPrice={this.props.price}
        />
      );
    }
    if (this.state.loading) {
      orderSummary = <Spinner />;
    }

    const duration = 1000;

    const defaultStyle = {
      transition: `opacity ${duration}ms ease-in-out`,
      opacity: 0
    };

    const transitionStyles = {
      entering: { opacity: 1 },
      entered: { opacity: 1 },
      exiting: { opacity: 0 },
      exited: { opacity: 0 }
    };

    const animationTiming = {
      enter: 500,
      exit: 1000
    };
    return (
      <Aux>
        {/* {this.state.purchasing && ( */}

        <Transition
          in={this.state.purchasing}
          timeout={animationTiming}
          mountOnEnter
          unmountOnExit
        >
          {(state) => (
            <div
              style={{
                // opacity: state === "exited" ? 0 : 1,
                // transition: "opacity 1s ease-out",
                ...defaultStyle,
                ...transitionStyles[state]
              }}
            >
              <Modal
                shoStyle={state}
                show={this.state.purchasing}
                modalClosed={this.purchaseCancelHandler}
              >
                {orderSummary}
              </Modal>
            </div>
          )}
        </Transition>

        {/* // )} */}
        {burger}
      </Aux>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ing: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error,
    token: state.auth.token,
    isAuthenticated: state.auth.token !== null
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onIngredientAdded: (ingName) =>
      dispatch(burgerBuilderActions.addIngredient(ingName)),

    onIngredientRemoved: (ingName) =>
      dispatch(burgerBuilderActions.removeIngredient(ingName)),

    onInitIngredients: (token) =>
      dispatch(burgerBuilderActions.initIngredients(token)),

    onInitPurchase: () => dispatch(burgerBuilderActions.purchaseInit()),

    onSetRedirectPath : (path) => dispatch(burgerBuilderActions.setAuthRedirectPath(path)) 
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
