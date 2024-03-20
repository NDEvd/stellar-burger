import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  getIngredientsApi,
  getUserApi,
  registerUserApi,
  TRegisterData,
  loginUserApi,
  TLoginData,
  logoutApi,
  getFeedsApi,
  orderBurgerApi,
  getOrdersApi,
  updateUserApi
} from '../../utils/burger-api';
import { TUser } from '../../utils/types';
import { setUser, setIsAuthChecked } from '../slices/userSlice';
import { deleteCookie, getCookie } from '../../utils/cookie';

export const fetchIngredients = createAsyncThunk(
  'ingredients/fetchAll',
  async () => getIngredientsApi()
);

export const checkUser = createAsyncThunk(
  'user/checkUser',
  async (_, { dispatch }): Promise<void> => {
    if (getCookie('accessToken')) {
      getUserApi()
        .then((res) => dispatch(setUser(res.user)))
        .catch((): void => {
          localStorage.removeItem('refreshToken');
          deleteCookie('accessToken');
        })
        .finally(() => dispatch(setIsAuthChecked(true)));
    } else {
      dispatch(setIsAuthChecked(true));
    }
  }
);

export const registerUser = createAsyncThunk(
  'user/registerUser',
  async ({ name, email, password }: TRegisterData) => {
    const data = await registerUserApi({ name, email, password });
    return data.user;
  }
);

export const loginUser = createAsyncThunk(
  'user/loginUser',
  async ({ email, password }: TLoginData): Promise<TUser> => {
    const data = await loginUserApi({ email, password });
    return data.user;
  }
);

export const logout = createAsyncThunk('user/logout', async () => {
  await logoutApi();
  deleteCookie('accessToken');
  localStorage.removeItem('refreshToken');
});

export const updateUser = createAsyncThunk(
  'user/updateUser',
  async ({ name, email, password }: TRegisterData) => {
    const data = await updateUserApi({ name, email, password });
    return data.user;
  }
);

export const getFeeds = createAsyncThunk('order/getFeeds', async () =>
  getFeedsApi()
);

export const orderBurger = createAsyncThunk(
  'order/orderBurger',
  async (ingredients: string[]) => {
    const data = await orderBurgerApi(ingredients);
    return data.order;
  }
);

export const getOrders = createAsyncThunk('order/getOrders', async () =>
  getOrdersApi()
);
