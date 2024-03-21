import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { TUser } from '../../utils/types';
import {
  registerUser,
  loginUser,
  logout,
  updateUser
} from '../actions/actions';

interface UserState {
  user: TUser | null;
  isAuthChecked: boolean;
}

const initialState: UserState = {
  user: null,
  isAuthChecked: false
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<TUser>) => {
      state.user = action.payload;
    },
    setIsAuthChecked: (state, action: PayloadAction<boolean>) => {
      state.isAuthChecked = action.payload;
    }
  },
  selectors: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isAuthChecked = true;
      })
      .addCase(registerUser.rejected, (state) => {
        state.isAuthChecked = false;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isAuthChecked = true;
        state.user = action.payload;
      })
      .addCase(loginUser.pending, (state) => {
        state.isAuthChecked = true;
      })
      .addCase(loginUser.rejected, (state) => {
        state.isAuthChecked = false;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isAuthChecked = true;
        state.user = action.payload;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.user = action.payload;
      });
  }
});

export default userSlice.reducer;
export const { setUser, setIsAuthChecked } = userSlice.actions;
