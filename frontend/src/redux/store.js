import { configureStore } from '@reduxjs/toolkit';
import ExampleSlice from './Slices/ExampleSlice';

export const store = configureStore({
  reducer: {
    example: ExampleSlice,

  },
});
