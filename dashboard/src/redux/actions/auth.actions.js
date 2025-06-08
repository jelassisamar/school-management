import axios from "axios";
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
} from "../constants/auth.constants";
import { AUTH_API } from "../utils/api";

export const loginAction = (credentials) => async (dispatch) => {
  dispatch({ type: LOGIN_REQUEST });

  try {
    const res = await axios.post(`${AUTH_API}/login`, credentials);
    const { token, user } = res.data;

    // Save token and user in localStorage
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));

    // Directly dispatch the login success action
    dispatch({ type: LOGIN_SUCCESS, payload: { token, user } });

    // Let redux-persist handle saving the token and user automatically
    axios.defaults.headers.Authorization = `Bearer ${token}`;
    console.log(axios.defaults.headers.Authorization); // Check if token is in the header
  } catch (err) {
    console.log(
      "Erreur lors de la connexion :",
      err.response ? err.response.data : err.message
    );

    const errorMessage =
      err.response?.data?.message ||
      err.message ||
      "Erreur inconnue lors de la connexion";
    dispatch({
      type: LOGIN_FAIL,
      payload: errorMessage,
    });
  }
};

export const logout = () => async (dispatch) => {
  dispatch({ type: LOGOUT_REQUEST });
  try {
    const token = localStorage.getItem("token"); // Get the token from localStorage before removal

    // Remove from localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    // Call API logout if token exists
    if (token) {
      await axios.post(
        `${AUTH_API}/logout`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
    }

    // Remove axios Authorization header
    delete axios.defaults.headers.Authorization;

    dispatch({ type: LOGOUT_SUCCESS });
    return Promise.resolve(); // Important for awaiting in the component
  } catch (err) {
    console.error("Logout error:", err);
    dispatch({ type: LOGOUT_FAIL, payload: err.message });
    return Promise.reject(err);
  }
};

export const checkAuth = () => async (dispatch) => {
  try {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");
    const user = userData ? JSON.parse(userData) : null;

    if (token && user) {
      // Optional: You could verify the token with the backend here

      // Set Authorization header for future requests
      axios.defaults.headers.Authorization = `Bearer ${token}`;

      dispatch({ type: LOGIN_SUCCESS, payload: { token, user } });

      return { isAuthenticated: true, user };
    } else {
      return { isAuthenticated: false };
    }
  } catch (err) {
    dispatch({ type: LOGIN_FAIL, payload: "Erreur d'authentification" });
    return { isAuthenticated: false };
  }
};
