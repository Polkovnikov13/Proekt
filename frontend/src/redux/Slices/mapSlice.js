import { createSlice } from '@reduxjs/toolkit';

const initialState = 'Российская Федерация';

const mapSlice = createSlice({
  name: 'mapSlice',
  initialState,
  reducers: {
    setMapName(state, action) {
      return action.payload;
    },
  },
});

export const { setMapName } = mapSlice.actions;
export default mapSlice.reducer;
