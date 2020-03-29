import React from "react";
import Aux from "../../../hoc/AuxComponent/Aux";
import Button from "../../UI/Button/Button";
// import Axios from "axios";
class OrderSummary extends React.Component {
  componentWillUpdate() {
    console.log("order summary is update...");
  }

  // async componentDidMount () {
  //   await Axios.get(`https://jsonplaceholder.typicode.com/posts`)
  //     .then((res) => {
  //       console.log(res.data);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }
  render() {
    const ingredientSummary = Object.keys(this.props.ingredients).map(
      (igKey) => {
        return (
          <li key={igKey}>
            <span style={{ textTransform: "capitalize" }}>{igKey}</span>:{" "}
            {this.props.ingredients[igKey]}
          </li>
        );
      }
    );
    return (
      <Aux>
        <h3>Your Order</h3>
        <p>A delicious burger with the following ingredients:</p>
        <ul>{ingredientSummary}</ul>
        <p>
          <strong>Total Price: {this.props.totalPrice.toFixed(2)}</strong>
        </p>
        <p>Continue to checkout?</p>
        <Button btnType="Danger" clicked={this.props.purchaseCancelHandler}>
          CANCEL
        </Button>
        <Button btnType="Success" clicked={this.props.purchaseContinueHandler}>
          CONTINUE
        </Button>
      </Aux>
    );
  }
}

export default OrderSummary;
