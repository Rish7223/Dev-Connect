import {
  REGISTER_USER,
  LOGIN_USER,
  AUTH_USER,
  AUTH_FAIL,
  LOGOUT_USER,
} from "../action/type";

const initialState = {
  token: localStorage.getItem("token"),
  user: null,
  isAuthenticated: false,
  loading: true,
};
// eslint-disable-next-line
export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case AUTH_USER:
      return {
        ...state,
        user: payload,
        loading: false,
        isAuthenticated: true,
      };
    case REGISTER_USER:
    case LOGIN_USER:
      localStorage.setItem("token", payload.token);
      return {
        ...state,
        token: localStorage.getItem("token"),
        isAuthenticated: true,
        loading: false,
      };
    case AUTH_FAIL:
    case LOGOUT_USER:
      localStorage.removeItem("token");
      return {
        token: "",
        user: null,
        isAuthenticated: false,
        loading: false,
      };
    default:
      return state;
  }
}
