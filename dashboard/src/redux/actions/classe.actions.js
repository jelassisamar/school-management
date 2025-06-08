import axios from "axios";
import {
  GET_CLASSE_REQUEST,
  GET_CLASSE_SUCCESS,
  GET_CLASSE_FAIL,
  CREATE_CLASSE_REQUEST,
  CREATE_CLASSE_SUCCESS,
  CREATE_CLASSE_FAIL,
  UPDATE_CLASSE_REQUEST,
  UPDATE_CLASSE_SUCCESS,
  UPDATE_CLASSE_FAIL,
  DELETE_CLASSE_REQUEST,
  DELETE_CLASSE_SUCCESS,
  DELETE_CLASSE_FAIL,
  GET_MATIERES_PAR_CLASSE_REQUEST,
  GET_MATIERES_PAR_CLASSE_SUCCESS,
  GET_MATIERES_PAR_CLASSE_FAIL,
} from "../constants/classe.constants";
import { CLASSE_API } from "../utils/api";

export const getClassesAPI = (token) => async (dispatch) => {
  try {
    dispatch({ type: GET_CLASSE_REQUEST });
    const response = await axios.get(`${CLASSE_API}/list`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    dispatch({
      type: GET_CLASSE_SUCCESS,
      payload: response.data.classes,
    });
  } catch (error) {
    dispatch({
      type: GET_CLASSE_FAIL,
      payload: error.response?.data?.message || error.message,
    });
    throw error;
  }
};

export const createClasseAPI = (classeData, token) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_CLASSE_REQUEST });
    const response = await axios.post(`${CLASSE_API}/add`, classeData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    dispatch({
      type: CREATE_CLASSE_SUCCESS,
      payload: response.data.classe,
    });
    return response.data;
  } catch (error) {
    dispatch({
      type: CREATE_CLASSE_FAIL,
      payload: error.response?.data?.message || error.message,
    });
    throw error;
  }
};

export const updateClasseAPI = (id, classeData, token) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_CLASSE_REQUEST });
    const response = await axios.put(`${CLASSE_API}/update/${id}`, classeData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    dispatch({
      type: UPDATE_CLASSE_SUCCESS,
      payload: response.data.classe,
    });
    return response.data;
  } catch (error) {
    dispatch({
      type: UPDATE_CLASSE_FAIL,
      payload: error.response?.data?.message || error.message,
    });
    throw error;
  }
};

export const deleteClasseAPI = (id, token) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_CLASSE_REQUEST });
    await axios.delete(`${CLASSE_API}/delete/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    dispatch({
      type: DELETE_CLASSE_SUCCESS,
      payload: id,
    });
  } catch (error) {
    dispatch({
      type: DELETE_CLASSE_FAIL,
      payload: error.response?.data?.message || error.message,
    });
    throw error;
  }
};

export const getMatieresParClasseAPI =
  (classeId, token) => async (dispatch) => {
    try {
      dispatch({ type: GET_MATIERES_PAR_CLASSE_REQUEST });

      const response = await axios.get(`${CLASSE_API}/${classeId}/matieres`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      dispatch({
        type: GET_MATIERES_PAR_CLASSE_SUCCESS,
        payload: response.data.matieres,
      });
    } catch (error) {
      dispatch({
        type: GET_MATIERES_PAR_CLASSE_FAIL,
        payload: error.response?.data?.message || error.message,
      });
    }
  };
