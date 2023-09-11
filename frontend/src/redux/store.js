import { configureStore } from '@reduxjs/toolkit';
import ExampleSlice from './Slices/ExampleSlice';
import mapSlice from './Slices/mapSlice';
import userReducer from './reducers/userReducer';

export const store = configureStore({
  reducer: {
    example: ExampleSlice,
    mapSlice,
    user: userReducer,
  },
});
