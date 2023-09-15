/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = [];

const cameraSlice = createSlice({
  name: 'camera',
  initialState,
  reducers: {
    setCamera(state, action) {
      return action.payload;
    },
  },
});

export const { setCamera } = cameraSlice.actions;
export default cameraSlice.reducer;

export const fetchCameraData = () => (dispatch) => {
  axios.get(`${process.env.REACT_APP_BASEURL}/api/camera`)
    .then((res) => {
      dispatch(setCamera(res.data));
    })
    .catch(console.log);
};
