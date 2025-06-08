const initialState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

import { LOGIN_SUCCESS, LOGOUT_SUCCESS } from "../constants/auth.constants";

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
        isAuthenticated: true,
        loading: false,
        error: null,
      };
    case LOGOUT_SUCCESS:
      return initialState;
    default:
      return state;
  }
}
