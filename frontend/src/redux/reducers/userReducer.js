import { LOGOUT, SET_AUTH, UPDATE_USER } from '../types';

export default function userReducer(state = {}, action) {
  const { type, payload } = action;
  switch (type) {
    case SET_AUTH:
      return payload;
    case UPDATE_USER:
      return {
        ...state,
        ...action.payload,
      };
    case LOGOUT:
      return {};
    default:
      return state;
  }
}
