// redux/store.js
import { createStore, combineReducers } from 'redux';
import cartReducer from './reducers'; // This might need renaming or adjusting if it only contains the cart logic
import userReducer from './userReducer'; // Make sure to import the userReducer
import orderReducer from './orderReducer';
const rootReducer = combineReducers({
  cart: cartReducer, // Handles cart-related state
  order: orderReducer, 
  user: userReducer  // Handles user-related state, including the token
  
});

const store = createStore(rootReducer);

export default store;
