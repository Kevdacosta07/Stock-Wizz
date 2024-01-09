import { configureStore } from '@reduxjs/toolkit';
import authReducer from "../features/auth/authSlice"
import articlesReducer from "../features/articles/articlesSlice"
import productsReducer from "../features/products/productSlice"

export const store = configureStore({
  reducer: {
    auth: authReducer,
    articles: articlesReducer,
    products: productsReducer
  },
});
