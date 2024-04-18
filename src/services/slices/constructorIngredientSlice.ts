import { createSlice } from '@reduxjs/toolkit';
import { TConstructorIngredient } from '../../utils/types';
import { v4 as uuidv4 } from 'uuid';
import type { PayloadAction } from '@reduxjs/toolkit';

interface ConstructorIngredientsState {
  constructorIngredients: TConstructorIngredient[];
}

const initialState: ConstructorIngredientsState = {
  constructorIngredients: []
};

export const constructorIngredientSlice = createSlice({
  name: 'constructorIngredients',
  initialState,
  reducers: {
    addIngredient: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        state.constructorIngredients.push(action.payload);
      },
      prepare: (constructorIngredientUnic) => ({
        payload: { ...constructorIngredientUnic, id: uuidv4() }
      })
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
    },
    moveIngredients: (state, action) => {
      const { index, move } = action.payload;

      switch (move) {
        case 'up':
          [
            state.constructorIngredients[index],
            state.constructorIngredients[index - 1]
          ] = [
            state.constructorIngredients[index - 1],
            state.constructorIngredients[index]
          ];
          break;
        case 'down':
          [
            state.constructorIngredients[index],
            state.constructorIngredients[index + 1]
          ] = [
            state.constructorIngredients[index + 1],
            state.constructorIngredients[index]
          ];
          break;
        default:
          return state;
      }
    }
  }
});

export default constructorIngredientSlice.reducer;
export const {
  addIngredient,
  removeIngredient,
  addBunIngredient,
  removeAllIngredient,
  moveIngredients
} = constructorIngredientSlice.actions;
