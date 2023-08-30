/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  array1: [],
  array2: [],
};

const exampleSlice = createSlice({
  name: 'example',
  initialState,
  reducers: {
    setArray1(state, action) {
      state.array1 = action.payload;
    },
    setArray2(state, action) {
      state.array2 = action.payload;
    },
  },
});

export const { setArray1, setArray2 } = exampleSlice.actions;
export default exampleSlice.reducer;

export const fetchExampleData = () => (dispatch) => {
  console.log('Fetching example data...');
  axios.get(`${process.env.REACT_APP_BASEURL}/api/data`)
    .then((res) => {
      console.log('Response from server:', res.data);
      dispatch(setArray1(res.data.array1));
      dispatch(setArray2(res.data.array2));
    })
    .catch(console.log);
};
