import constructorIngredientReducer, {
  addIngredient,
  moveIngredients,
  removeIngredient
} from '../services/slices/constructorIngredientSlice';
import initialState from '../services/slices/constructorIngredientSlice';

describe('constructorIngredientSlice', () => {
  const mockIngredient = {
    ...initialState,
    constructorIngredients: [
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

  const newIngredient = {
    calories: 643,
    carbohydrates: 85,
    fat: 26,
    id: '59b821c4-b426-4cfd-884c-2b236c0fb574',
    image: 'https://code.s3.yandex.net/react/code/meat-03.png',
    image_large: 'https://code.s3.yandex.net/react/code/meat-03-large.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
    name: 'Филе Люминесцентного тетраодонтимформа',
    price: 988,
    proteins: 44,
    type: 'main',
    __v: 0,
    _id: '643d69a5c3f7b9001cfa093e'
  };

  it('корректное добавление ингредиента', () => {
    const result = constructorIngredientReducer(
      mockIngredient,

      {
        type: addIngredient.type,
        payload: newIngredient
      }
    );

    expect(result).toEqual({
      ...mockIngredient,
      constructorIngredients: [
        ...mockIngredient.constructorIngredients,
        newIngredient
      ]
    });
  });

  it('корректное удаление ингредиента', () => {
    const { id } = mockIngredient.constructorIngredients[0];

    const result = constructorIngredientReducer(
      mockIngredient,
      removeIngredient({ id })
    );

    expect(result).toEqual({
      ...mockIngredient,
      constructorIngredients: [
        ...mockIngredient.constructorIngredients.filter((i) => i.id !== id)
      ]
    });
  });

  it('корректное изменение порядка ингредиентов в начинке', () => {
    const result = constructorIngredientReducer(
      mockIngredient,
      moveIngredients({ index: 1, move: 'up' })
    );

    expect(result).toEqual({
      ...mockIngredient,
      constructorIngredients: [
        mockIngredient.constructorIngredients[1],
        mockIngredient.constructorIngredients[0],
        mockIngredient.constructorIngredients[2]
      ]
    });
  });
});
