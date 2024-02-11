import { configureStore } from '@reduxjs/toolkit';
import authReducer from "../features/auth/authSlice"
import productsReducer from "../features/products/productSlice"
import optionReducer from "../features/options/optionSlice"
import transactionReducer from "../features/transactions/transactionSlice"

export const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productsReducer,
    options: optionReducer,
    transactions: transactionReducer,
  },
});
