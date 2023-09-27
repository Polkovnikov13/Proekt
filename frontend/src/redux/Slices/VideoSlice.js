/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = [];

const videoSlice = createSlice({
  name: 'video',
  initialState,
  reducers: {
    setCameraID(state, action) {
      return action.payload;
    },
  },
});

export const { setCameraID } = videoSlice.actions;
export default videoSlice.reducer;

export const fetchCameraDataID = (id) => (dispatch) => {
  axios.get(`${process.env.REACT_APP_BASEURL}/api/camera/${id}`)
    .then((res) => {
      // console.log('API Response:', res.data); // Log the response data
      dispatch(setCameraID(res.data));
    })
    .catch((error) => {
      console.error('API Error:', error); // Log any errors
    });
};
