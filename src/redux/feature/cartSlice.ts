import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

const initialState = {
  items: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      state.items = [...state.items, action.payload];
    },
    updateCartItem: (state, action) => {},
    removeCartItem: (state, action) => {
      const indexItemRemove = state.items.findIndex(
        (item) => item.id === action.payload
      );

      let newCart = [...state.items];

      if (indexItemRemove >= 0) {
        newCart.slice(indexItemRemove, 1);
      } else {
        console.log("Item not exsting....");
      }

      state.items = newCart;
    },
  },
});

export const { addToCart, updateCartItem, removeCartItem } = cartSlice.actions;

export const selectItems = (state: RootState) => state.cart.items;
export const selectTotal = (state: RootState) =>
  state.cart.items.reduce((total, itemCart) => {
    total + itemCart.price;
  }, 0);
export default cartSlice.reducer;
