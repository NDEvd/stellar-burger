import { expect, test, describe } from '@jest/globals';
import ingredientReducer, {
  initialState
} from '../services/slices/ingredientSlice';
import { fetchIngredients } from '../services/actions/actions';
import { error } from 'console';

describe('ingredientSlice', () => {
  const mockIngredient = {
    ...initialState,
    ingredients: [
      {
        calories: 420,
        carbohydrates: 53,
        fat: 24,
        id: 'd03ac4a3-3abc-4f37-af04-ef4a4eb614a1',
        image: 'https://code.s3.yandex.net/react/code/bun-02.png',
        image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
        image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
        name: 'Краторная булка N-200i',
        price: 1255,
        proteins: 80,
        type: 'bun',
        __v: 0,
        _id: '643d69a5c3f7b9001cfa093c'
      },
      {
        calories: 4242,
        carbohydrates: 242,
        fat: 142,
        id: '0fcc11da-dc83-4abd-b2b8-5623d83a3a1b',
        image: 'https://code.s3.yandex.net/react/code/meat-01.png',
        image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
        image_mobile:
          'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
        name: 'Биокотлета из марсианской Магнолии',
        price: 424,
        proteins: 420,
        type: 'main',
        __v: 0,
        _id: '643d69a5c3f7b9001cfa0941'
      },
      {
        calories: 99,
        carbohydrates: 42,
        fat: 24,
        id: '27469113-2de9-492c-a1f2-27b13da0c5cc',
        image: 'https://code.s3.yandex.net/react/code/sauce-03.png',
        image_large: 'https://code.s3.yandex.net/react/code/sauce-03-large.png',
        image_mobile:
          'https://code.s3.yandex.net/react/code/sauce-03-mobile.png',
        name: 'Соус традиционный галактический',
        price: 15,
        proteins: 42,
        type: 'sauce',
        __v: 0,
        _id: '643d69a5c3f7b9001cfa0944'
      }
    ]
  };

  it('экшены начала запроса', () => {
    const action = {
      type: fetchIngredients.pending.type,
      payload: mockIngredient
    };

    const result = ingredientReducer(initialState, action);

    const expectedResult = {
      ...initialState,
      loading: true,
      error: null
    };

    expect(result).toEqual(expectedResult);
  });

  it('успешное выполнение запроса ', () => {
    const action = {
      type: fetchIngredients.fulfilled.type,
      payload: mockIngredient
    };

    const result = ingredientReducer(initialState, action);

    const expectedResult = {
      ...initialState,
      ingredients: mockIngredient,
      loading: false,
      error: null
    };

    expect(result).toEqual(expectedResult);
  });

  it('обработка ошибки запроса', () => {
    const mockError = {
      message: 'error'
    };

    const action = {
      type: fetchIngredients.rejected.type,
      error: mockError
    };

    const result = ingredientReducer(initialState, action);

    const expectedResult = {
      ...initialState,
      loading: false,
      error: 'error'
    };

    expect(result).toEqual(expectedResult);
  });
});
