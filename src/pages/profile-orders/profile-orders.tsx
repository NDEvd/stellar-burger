import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useSelector, useDispatch } from '../../services/store';
import { getOrders } from '../../services/actions/actions';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getOrders());
  }, []);

  const orders = useSelector((store) => store.order.userOrders);

  return <ProfileOrdersUI orders={orders} />;
};
