import { configureStore, ThunkAction ,Action ,combineReducers } from "@reduxjs/toolkit";
import cartReducer from './feature/cartSlice'

const rootReducer = combineReducers({
  cart: cartReducer
})


export const store = configureStore({
  reducer:rootReducer,
  devTools: true
})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;