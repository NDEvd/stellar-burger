import { expect, test, describe } from '@jest/globals';
import orderReducer, { initialState } from '../services/slices/orderSlice';
import { getFeeds, orderBurger } from '../services/actions/actions';
import { error } from 'console';

describe('оформление заказа', () => {
  const mockOrder = {
    ...initialState,
    success: true,
    name: 'Space флюоресцентный бургер',
    order: {
      ingredients: [
        {
          _id: '643d69a5c3f7b9001cfa093c',
          name: 'Краторная булка N-200i',
          type: 'bun',
          proteins: 80,
          fat: 24,
          carbohydrates: 53,
          calories: 420,
          price: 1255,
          image: 'https://code.s3.yandex.net/react/code/bun-02.png',
          image_mobile:
            'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
          image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
          __v: 0
        },
        {
          _id: '643d69a5c3f7b9001cfa0942',
          name: 'Соус Spicy-X',
          type: 'sauce',
          proteins: 30,
          fat: 20,
          carbohydrates: 40,
          calories: 30,
          price: 90,
          image: 'https://code.s3.yandex.net/react/code/sauce-02.png',
          image_mobile:
            'https://code.s3.yandex.net/react/code/sauce-02-mobile.png',
          image_large:
            'https://code.s3.yandex.net/react/code/sauce-02-large.png',
          __v: 0
        },
        {
          _id: '643d69a5c3f7b9001cfa0944',
          name: 'Соус традиционный галактический',
          type: 'sauce',
          proteins: 42,
          fat: 24,
          carbohydrates: 42,
          calories: 99,
          price: 15,
          image: 'https://code.s3.yandex.net/react/code/sauce-03.png',
          image_mobile:
            'https://code.s3.yandex.net/react/code/sauce-03-mobile.png',
          image_large:
            'https://code.s3.yandex.net/react/code/sauce-03-large.png',
          __v: 0
        },
        {
          _id: '643d69a5c3f7b9001cfa093c',
          name: 'Краторная булка N-200i',
          type: 'bun',
          proteins: 80,
          fat: 24,
          carbohydrates: 53,
          calories: 420,
          price: 1255,
          image: 'https://code.s3.yandex.net/react/code/bun-02.png',
          image_mobile:
            'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
          image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
          __v: 0
        }
      ],
      _id: '661e422e97ede0001d065d1a',
      owner: {
        name: 'test4',
        email: 'oooooond@yandex.ru',
        createdAt: '2024-03-20T07:44:31.066Z',
        updatedAt: '2024-03-20T07:44:31.066Z'
      },
      status: 'done',
      name: 'Краторный традиционный-галактический spicy бургер',
      createdAt: '2024-04-16T09:17:34.087Z',
      updatedAt: '2024-04-16T09:17:34.577Z',
      number: 38182,
      price: 2615
    }
  };

  it('экшены начала запроса', () => {
    const action = {
      type: orderBurger.pending.type,
      payload: mockOrder
    };

    const result = orderReducer(initialState, action);

    const expectedResult = {
      ...initialState,
      orderRequest: true
    };

    expect(result).toEqual(expectedResult);
  });

  it('успешное выполнение запроса ', () => {
    const action = {
      type: orderBurger.fulfilled.type,
      payload: mockOrder
    };

    const result = orderReducer(initialState, action);

    const expectedResult = {
      ...initialState,
      orderRequest: false,
      orderModalData: mockOrder
    };

    expect(result).toEqual(expectedResult);
  });

  it('обработка ошибки запроса', () => {
    const mockError = {
      message: 'error'
    };

    const action = {
      type: orderBurger.rejected.type,
      error: mockError
    };

    const result = orderReducer(initialState, action);

    const expectedResult = {
      ...initialState,
      orderRequest: false
    };

    expect(result).toEqual(expectedResult);
  });
});

describe('получение ленты заказов', () => {
  const mockFeed = {
    ...initialState,
    success: true,
    orders: [
      {
        _id: '661ec3ef97ede0001d065f88',
        ingredients: ['643d69a5c3f7b9001cfa093d', '643d69a5c3f7b9001cfa093d'],
        status: 'done',
        name: 'Флюоресцентный бургер',
        createdAt: '2024-04-16T18:31:11.475Z',
        updatedAt: '2024-04-16T18:31:12.004Z',
        number: 38202
      },
      {
        _id: '661ebdf697ede0001d065f78',
        ingredients: ['643d69a5c3f7b9001cfa093d', '643d69a5c3f7b9001cfa093d'],
        status: 'done',
        name: 'Флюоресцентный бургер',
        createdAt: '2024-04-16T18:05:42.956Z',
        updatedAt: '2024-04-16T18:05:43.563Z',
        number: 38201
      }
    ],
    total: 1000,
    totalToday: 2
  };

  it('экшены начала запроса', () => {
    const action = {
      type: getFeeds.pending.type,
      payload: mockFeed
    };

    const result = orderReducer(initialState, action);

    const expectedResult = {
      ...initialState,
      error: null
    };

    expect(result).toEqual(expectedResult);
  });

  it('успешное выполнение запроса ', () => {
    const action = {
      type: getFeeds.fulfilled.type,
      payload: mockFeed
    };

    const result = orderReducer(initialState, action);

    const expectedResult = {
      ...initialState,
      feed: {
        orders: mockFeed.orders,
        total: mockFeed.total,
        totalToday: mockFeed.totalToday
      }
    };

    expect(result).toEqual(expectedResult);
  });

  it('обработка ошибки запроса', () => {
    const mockError = {
      message: 'error'
    };

    const action = {
      type: getFeeds.rejected.type,
      error: mockError
    };

    const result = orderReducer(initialState, action);

    const expectedResult = {
      ...initialState,
      error: 'error'
    };

    expect(result).toEqual(expectedResult);
  });
});
