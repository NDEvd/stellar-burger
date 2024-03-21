import { createSlice } from '@reduxjs/toolkit';
import { TConstructorIngredient } from '../../utils/types';
import { v4 as uuidv4 } from 'uuid';

interface ConstructorIngredientsState {
  constructorIngredients: TConstructorIngredient[];
  loading: boolean;
  error: string | undefined | null;
}

const initialState: ConstructorIngredientsState = {
  constructorIngredients: [],
  loading: false,
  error: null
};

export const constructorIngredientSlice = createSlice({
  name: 'constructorIngredients',
  initialState,
  reducers: {
    addIngredient: (state, action) => {
      const constructorIngredientUnic: TConstructorIngredient = {
        ...action.payload,
        id: uuidv4()
      };
      state.constructorIngredients.push(constructorIngredientUnic);
    },
    addBunIngredient: (state, action) => {
      const constructorIngredientUnic: TConstructorIngredient = {
        ...action.payload,
        id: uuidv4()
      };
      if (!state.constructorIngredients.some((item) => item.type === 'bun')) {
        state.constructorIngredients.push(constructorIngredientUnic);
      } else {
        state.constructorIngredients = state.constructorIngredients.map(
          (item) => {
            if (item.type !== 'bun') {
              return item;
            }
            return constructorIngredientUnic;
          }
        );
      }
    },
    removeIngredient: (state, action) => {
      state.constructorIngredients = state.constructorIngredients.filter(
        (item) => item.id !== action.payload.id
      );
    },
    removeAllIngredient: (state) => {
      state.constructorIngredients = [];
    }
  }
});

export default constructorIngredientSlice.reducer;
export const {
  addIngredient,
  removeIngredient,
  addBunIngredient,
  removeAllIngredient
} = constructorIngredientSlice.actions;
