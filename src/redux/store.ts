import {
  legacy_createStore as createStore,
  combineReducers,
  applyMiddleware,
} from "redux";

import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import {
  userReducer,
  productReducerAll,
  cartReducer,
  orderReducer,
  productReducer,
} from "./reducers";

const initialState: any = {
  cart: {
    cartItems:
      typeof window !== "undefined" && localStorage.getItem("cartItems")
        ? JSON.parse(localStorage.getItem("cartItems"))
        : [],
    shippingInfo:
      typeof window !== "undefined" &&
      localStorage &&
      localStorage.getItem("shippingInfo")
        ? JSON.parse(localStorage.getItem("shippingInfo"))
        : {},
  },
};

const reducers = combineReducers({
  products: productReducer,
  productDetails: productReducerAll.productDetailsReducer,
  user: userReducer.userReducer,
  updateProfile: userReducer.profileReducer,
  password: userReducer.forgotPasswordReducer,
  cart: cartReducer.cartReducer,
  newOrder: orderReducer.newOrderReducer,
  myOrders: orderReducer.myOrdersReducer,
  orderDetails: orderReducer.orderRetailsReducer,
  newReview: productReducerAll.newReviewReducer,
  product: productReducerAll.productReducerSingle,
  updateOrderStatus: orderReducer.updateOrderStatus,
});

const middleware = [thunk];

const store = createStore(
  reducers,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
