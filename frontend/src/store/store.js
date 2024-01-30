import { configureStore } from '@reduxjs/toolkit';
import authReducer from "../features/auth/authSlice"
import articlesReducer from "../features/articles/articlesSlice"
import productsReducer from "../features/products/productSlice"
import optionReducer from "../features/options/optionSlice"

export const store = configureStore({
  reducer: {
    auth: authReducer,
    articles: articlesReducer,
    products: productsReducer,
    options: optionReducer
  },
});
