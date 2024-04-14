import { FC, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import store, { useSelector, useDispatch } from '../../services/store';
import { orderBurger } from '../../services/actions/actions';
import { removeAllIngredient } from '../../services/slices/constructorIngredientSlice';
import { closeOrderNumberModal } from '../../services/slices/orderSlice';

export const BurgerConstructor: FC = () => {
  const navigate = useNavigate();
  const constructorIngredient = useSelector(
    (state) => state.constructorIngredients.constructorIngredients
  );

  const bun = constructorIngredient.find((item) => item.type === 'bun');
  const constructorItems = {
    bun: bun ? bun : null,
    ingredients: constructorIngredient.filter(
      (item) => item.type === 'sauce' || item.type === 'main'
    )
  };

  const orderRequest = useSelector((store) => store.order.orderRequest);

  const orderModalData = useSelector((store) => store.order.orderModalData);
  const user = useSelector((store) => store.user.user);

  const ingredientsId = constructorIngredient.map((item) => item._id);
  const allIngredientsId = constructorItems.bun
    ? [...ingredientsId, constructorItems.bun._id]
    : ingredientsId;
  const dispatch = useDispatch();

  const onOrderClick = () => {
    if (!user) {
      navigate('/login');
      return;
    }
    if (!constructorItems.bun || orderRequest) return;

    dispatch(orderBurger(allIngredientsId));
  };

  const closeOrderModal = () => {
    dispatch(closeOrderNumberModal());
    dispatch(removeAllIngredient());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
