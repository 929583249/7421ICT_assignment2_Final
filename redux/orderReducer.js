// orderReducer.js
const initialState = {
    orders: []  // 确保有初始化的空数组
  };
  
  const orderReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'ADD_NEW_ORDER':
        return {
          ...state,
          orders: [...state.orders, action.payload]
        };
      default:
        return state;
    }
  };
  
  export default orderReducer;
  