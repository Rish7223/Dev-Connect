import {
  LOGIN_USER,
  REGISTER_USER,
  AUTH_USER,
  AUTH_FAIL,
  LOGOUT_USER,
} from "./type";
import axios from "axios";
import { setAlert } from "./alert";
import setAuthToken from "../utility/setAuthToken";

// user authentication
export const authUser = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  try {
    const res = await axios.get("/api/auth");
    dispatch({
      type: AUTH_USER,
      payload: res.data,
    });
  } catch (err) {
    dispatch({ type: AUTH_FAIL });
  }
};

// login User
export const loginUser = (formData) => async (dispatch) => {
  const { email, password } = formData;
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({ email, password });
  try {
    const res = await axios.post("/api/auth/login", body, config);
    dispatch({
      type: LOGIN_USER,
      payload: res.data,
    });
    dispatch(authUser());
  } catch (err) {
    if (err.response) {
      const errors = err.response.data.errors;
      if (errors.length > 0) {
        errors.map((error) => dispatch(setAlert(error.msg, "dng")));
      }
    } else {
      console.log(err.message);
    }
  }
};

// user registration
export const registerUser = (formData) => async (dispatch) => {
  const { username, email, password } = formData;
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({ username, email, password });
  try {
    const res = await axios.post("/api/user", body, config);
    dispatch({
      type: REGISTER_USER,
      payload: res.data,
    });
    dispatch(authUser());
  } catch (err) {
    if (err.response) {
      const errors = err.response.data.errors;
      if (errors.length > 0) {
        errors.map((error) => dispatch(setAlert(error.msg, "dng")));
      }
    } else {
      console.log(err.message);
    }
  }
};

// logout
export const logout = () => (dispatch) => {
  dispatch({ type: LOGOUT_USER });
};
