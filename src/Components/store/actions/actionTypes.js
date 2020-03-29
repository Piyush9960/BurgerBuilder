/*
01. Action Types,
02. Action Creators,
03. reducer cases define,
04. export the action from index file

 */


export const ADD_INGREDIENT = "ADD_INGREDIENT"
export const REMOVE_INGREDIENT = "REMOVE_INGREDIENT"
export const SET_INGREDIENTS = "SET_INGREDIENTS";
export const FETCH_INGREDIENTS_FAILED = "FETCH_INGREDIENTS_FAILED"

//orders actions
export const PURCHASE_BURGER_START = "PURCHASE_BURGER_START"
export const PURCHASE_BURGER_SUCCESS = "PURCHASE_BURGER_SUCCESS"
export const PURCHASE_BURGER_FAIL = "PURCHASE_BURGER_FAIL"
export const PURCHASE_INIT = "PURCHASE_INIT"

export const FETCH_ORDER_START = "FETCH_ORDER_START"
export const FETCH_ORDER_SUCCESS = "FETCH_ORDER_SUCCESS"
export const FETCH_ORDER_FAIL = "FETCH_ORDER_FAIL"
export const AUTH_LOGOUT = "AUTH_LOGOUT"

export const SET_AUTH_REDIRECT_PATH = "SET_AUTH_REDIRECT_PATH"





export const AUTH_START = "AUTH_START"
export const AUTH_SUCCESS = "AUTH_SUCCESS"
export const AUTH_FAIL = "AUTH_FAIL"
