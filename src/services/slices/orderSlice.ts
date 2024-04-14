import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TOrder, TOrdersData } from '../../utils/types';
import { getFeeds, orderBurger, getOrders } from '../actions/actions';

interface OrderState {
  order: TOrder | null;
  feed: TOrdersData;
  userOrders: TOrder[];
  error: string | undefined | null;
  // newOrder: TOrder | null;
  orderRequest: boolean;
  orderModalData: TOrder | null;
}

const initialState: OrderState = {
  order: null,
  feed: {
    orders: [],
    total: 0,
    totalToday: 0
  },
  userOrders: [],
  error: null,
  // newOrder: null,
  orderRequest: false,
  orderModalData: null
};

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    closeOrderNumberModal: (state) => {
      state.orderRequest = false;
      state.orderModalData = null;
    }
  },
  selectors: {},
  extraReducers: (builder) => {
    builder
      .addCase(getFeeds.pending, (state) => {
        state.error = null;
      })
      .addCase(getFeeds.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(getFeeds.fulfilled, (state, action) => {
        state.feed.orders = action.payload.orders;
        state.feed.total = action.payload.total;
        state.feed.totalToday = action.payload.totalToday;
      })
      .addCase(orderBurger.pending, (state) => {
        state.orderRequest = true;
      })
      .addCase(orderBurger.rejected, (state) => {
        state.orderRequest = false;
      })
      .addCase(orderBurger.fulfilled, (state, action) => {
        state.orderRequest = false;
        state.orderModalData = action.payload;
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.userOrders = action.payload;
      });
  }
});
export default orderSlice.reducer;
export const { closeOrderNumberModal } = orderSlice.actions;
