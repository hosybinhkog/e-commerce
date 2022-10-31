import {
  ADD_TO_CART,
  REMOVE_TO_CART,
  SAVE_SHOPPING_INFO,
} from "@/constants/redux.contants";

export const cartReducer = (
  state = { cartItems: [], shippingInfo: {} },
  action
) => {
  switch (action.type) {
    case ADD_TO_CART:
      const item = action.payload;
      const isItemExist = state.cartItems.find(
        (i) => i.product === item.product
      );
      if (isItemExist) {
        return {
          ...state,
          cartItems: state.cartItems.map((i) =>
            i.product === isItemExist.product
              ? { ...item, quantity: item.quantity + 1 }
              : i
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        };
      }
    case REMOVE_TO_CART:
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (item) => item.product !== action.payload
        ),
      };
    case SAVE_SHOPPING_INFO:
      return {
        ...state,
        shippingInfo: action.payload,
      };
    default:
      return {
        ...state,
      };
  }
};
