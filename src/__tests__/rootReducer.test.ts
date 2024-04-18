import { combineReducers } from 'redux';
import { ingredientSlice } from '../services/slices/ingredientSlice';
import { constructorIngredientSlice } from '../services/slices/constructorIngredientSlice';
import { userSlice } from '../services/slices/userSlice';
import { orderSlice } from '../services/slices/orderSlice';
import store from '../services/store';

describe('rootReducer', () => {
  it('правильная инициализация rootReducer', () => {
    const testRootReducer = combineReducers({
      ingredients: ingredientSlice.reducer,
      constructorIngredients: constructorIngredientSlice.reducer,
      user: userSlice.reducer,
      order: orderSlice.reducer
    });

    const action = { type: 'UNKNOWN_ACTION' };
    const test = testRootReducer(undefined, action);
    expect(store.getState()).toEqual(test);
  });
});
