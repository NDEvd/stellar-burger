import { combineReducers, configureStore } from '@reduxjs/toolkit';
import ingredientSlice from './slices/ingredientSlice';
import constructorIngredientSlice from './slices/constructorIngredientSlice';
import userSlice from './slices/userSlice';
import orderSlice from './slices/orderSlice';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';

const rootReducer = combineReducers({
  ingredients: ingredientSlice,
  constructorIngredients: constructorIngredientSlice,
  user: userSlice,
  order: orderSlice
});

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
