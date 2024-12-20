import { configureStore } from '@reduxjs/toolkit';
import ExampleSlice from './Slices/ExampleSlice';
import mapSlice from './Slices/mapSlice';
import userReducer from './reducers/userReducer';
import cameraSlice from './Slices/cameraSlice';
import VideoSlice from './Slices/VideoSlice';

export const store = configureStore({
  reducer: {
    example: ExampleSlice,
    mapSlice,
    user: userReducer,
    camera: cameraSlice,
    video: VideoSlice,
  },
});
