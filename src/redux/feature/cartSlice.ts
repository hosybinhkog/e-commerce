import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store'

const initialState = {
  items: []
}


export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {

    },
    updateCartItem: (state, action) => {

    },
    removeCartItem: (state, action) => {

    }
  }
})

export const { addToCart, updateCartItem, removeCartItem } = cartSlice.actions  

export const selectItems = (state:RootState) => state.cart.items
export default cartSlice.reducer