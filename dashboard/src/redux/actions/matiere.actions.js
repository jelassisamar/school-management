import axios from "axios";
import {
  GET_MATIERES_REQUEST,
  GET_MATIERES_SUCCESS,
  GET_MATIERES_FAIL,
  ADD_MATIERE_REQUEST,
  ADD_MATIERE_SUCCESS,
  ADD_MATIERE_FAIL,
  DELETE_MATIERE_REQUEST,
  DELETE_MATIERE_SUCCESS,
  DELETE_MATIERE_FAIL,
} from "../constants/matiere.constants";

import { MATIERE_API } from "../utils/api";

export const getMatieresAPI = () => async (dispatch) => {
  dispatch({ type: GET_MATIERES_REQUEST });

  try {
    const token = localStorage.getItem("token");

    const { data } = await axios.get(`${MATIERE_API}/getmatieres`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    dispatch({ type: GET_MATIERES_SUCCESS, payload: data });
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message;
    dispatch({ type: GET_MATIERES_FAIL, payload: errorMessage });
  }
};

export const addMatiereAPI = (matiereData) => async (dispatch) => {
  dispatch({ type: ADD_MATIERE_REQUEST });

  try {
    const token = localStorage.getItem("token");

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.post(
      `${MATIERE_API}/addmatiere`,
      matiereData,
      config
    );

    dispatch({ type: ADD_MATIERE_SUCCESS, payload: data });
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message;
    dispatch({ type: ADD_MATIERE_FAIL, payload: errorMessage });
  }
};

export const deleteMatiereAPI = (id) => async (dispatch) => {
  dispatch({ type: DELETE_MATIERE_REQUEST });

  try {
    const token = localStorage.getItem("token");

    await axios.delete(`${MATIERE_API}/${id}/deletematiere`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    dispatch({ type: DELETE_MATIERE_SUCCESS, payload: id });
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message;
    dispatch({ type: DELETE_MATIERE_FAIL, payload: errorMessage });
  }
};
