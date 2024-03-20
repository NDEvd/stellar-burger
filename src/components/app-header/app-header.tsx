import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import store, { useSelector } from '../../services/store';

export const AppHeader: FC = () => {
  const name = useSelector((store) => store.user.user?.name);

  return <AppHeaderUI userName={name} />;
};
