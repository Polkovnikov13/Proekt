import { configureStore } from '@reduxjs/toolkit';
import ExampleSlice from './Slices/ExampleSlice';
import mapSlice from './Slices/mapSlice';

export const store = configureStore({
  reducer: {
    example: ExampleSlice,
    mapSlice,
  },
});
