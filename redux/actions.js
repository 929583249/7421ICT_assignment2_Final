// actions.js
export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
export const INCREASE_QUANTITY = 'INCREASE_QUANTITY';
export const DECREASE_QUANTITY = 'DECREASE_QUANTITY';
export const CLEAR_CART = 'CLEAR_CART';
export const ADD_NEW_ORDER = 'ADD_NEW_ORDER';

export const addNewOrder = (orderDetails) => ({
  type: ADD_NEW_ORDER,
  payload: orderDetails,
});

export const addToCart = (item) => ({
  type: ADD_TO_CART,
  payload: item,
});

export const removeFromCart = (itemId) => ({
  type: REMOVE_FROM_CART,
  payload: itemId,
});

export const increaseQuantity = (itemId) => ({
  type: INCREASE_QUANTITY,
  payload: itemId,
});

export const decreaseQuantity = (itemId) => ({
  type: DECREASE_QUANTITY,
  payload: itemId,
});

export const clearCart = () => ({
  type: CLEAR_CART,
});
