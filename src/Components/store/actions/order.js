import * as actionTypes from "./actionTypes";
import Axios from "../../../axios-orders";
import { Notification } from "../../../Components/Notification/Notification";

export const purchaseBurgerSuccess = (id, orderData) => {
  return {
    type: actionTypes.PURCHASE_BURGER_SUCCESS,
    orderId: id,
    orderData: orderData
  };
};

export const purchaseBurgerFail = (error) => {
  return {
    type: actionTypes.PURCHASE_BURGER_FAIL,
    error: error
  };
};

export const purchaseBurgerStart = () => {
  return {
    type: actionTypes.PURCHASE_BURGER_START
  };
};

export const purchaseBurger = (orderData, token) => {
  return (dispatch) => {
    dispatch(purchaseBurgerStart());
    Axios.post("/orders.json?auth="+ token, orderData)
      .then((response) => {
        dispatch(purchaseBurgerSuccess(response.data.name, orderData));
        Notification("success", "Your Order Placed successfully..");
        //   setTimeout(() => {
        //     this.props.history.push("/");
        //   }, 4000);
      })
      .catch((error) => {
        dispatch(purchaseBurgerFail(error));
      });
  };
};

export const purchaseInit = () => {
  return {
    type: actionTypes.PURCHASE_INIT
  };
};

export const fetchOrdersSucces = (order) => {
  return {
    type: actionTypes.FETCH_ORDER_SUCCESS,
    orders: order
  };
};

export const fetchOrdersFail = (error) => {
  return {
    type: actionTypes.PURCHASE_BURGER_FAIL,
    error: error
  };
};

export const fetchOrdersStart = () => {
  return {
    type: actionTypes.PURCHASE_BURGER_START
  };
};

export const fetchOrders = (token, userId) => {
  return (dispatch) => {
    dispatch(fetchOrdersStart());
    // "?auth=" + token + '&orderBy="userId"&equalTo="' + userId + '"';
    const queryParams = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"';
   

    Axios.get("/orders.json"+ queryParams)
      .then((response) => {
        const fetchedOrders = [];
        for (let key in response.data) {
          fetchedOrders.push({
            ...response.data[key],
            id: key
          });
        }
        dispatch(fetchOrdersSucces(fetchedOrders));
      })
      .catch((err) => {
        dispatch(fetchOrdersFail(err));
      });
  };
};
