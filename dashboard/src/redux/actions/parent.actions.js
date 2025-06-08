import axios from "axios";
import {
  PARENT_CHILDREN_REQUEST,
  PARENT_CHILDREN_SUCCESS,
  PARENT_CHILDREN_FAIL,
  GET_PARENTS_REQUEST,
  GET_PARENTS_SUCCESS,
  GET_PARENTS_FAIL,
  ADD_PARENT_REQUEST,
  ADD_PARENT_SUCCESS,
  ADD_PARENT_FAIL,
  DELETE_PARENT_REQUEST,
  DELETE_PARENT_SUCCESS,
  DELETE_PARENT_FAIL,
  UPDATE_PARENT_REQUEST,
  UPDATE_PARENT_SUCCESS,
  UPDATE_PARENT_FAIL,
  DELETE_PARENT_CHILD_REQUEST,
  DELETE_PARENT_CHILD_SUCCESS,
  DELETE_PARENT_CHILD_FAIL,
  ADD_PARENT_CHILD_REQUEST,
  ADD_PARENT_CHILD_SUCCESS,
  ADD_PARENT_CHILD_FAIL,
} from "../constants/parent.constants";

import { PARENT_API } from "../utils/api";

export const fetchParentChildren = (parentId, token) => async (dispatch) => {
  dispatch({ type: PARENT_CHILDREN_REQUEST });
  try {
    const { data } = await axios.get(`${PARENT_API}/${parentId}/enfants`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const enfants = data?.data?.enfants || [];
    dispatch({ type: PARENT_CHILDREN_SUCCESS, payload: enfants });

    // ✅ return data explicitly
    return enfants;
  } catch (error) {
    dispatch({
      type: PARENT_CHILDREN_FAIL,
      payload: error.response?.data?.message || error.message,
    });
    throw error; // so that component can catch it
  }
};

export const ajouterParentAPI = (data, token) => async (dispatch) => {
  dispatch({ type: ADD_PARENT_REQUEST });
  try {
    // Format the data exactly as backend expects
    const parentData = {
      login: data.login,
      nom: data.nom,
      prenom: data.prenom,
      email: data.email,
      telephone: data.telephone,
      motDePasse: data.motDePasse,
      dateNaissance: new Date(data.dateNaissance).toISOString(), // Ensure proper date format
      studentIds: data.enfants,
    };

    const res = await axios.post(`${PARENT_API}/addParent`, parentData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    dispatch({ type: ADD_PARENT_SUCCESS, payload: res.data });
    return res.data; // Return the response data
  } catch (err) {
    const errorMessage = err.response?.data?.message || err.message;
    dispatch({
      type: ADD_PARENT_FAIL,
      payload: errorMessage,
    });
    throw new Error(errorMessage); // Throw error to be caught in component
  }
};

export const getParentsAPI = (token) => async (dispatch) => {
  dispatch({ type: GET_PARENTS_REQUEST });
  try {
    const res = await axios.get(`${PARENT_API}/getparents`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    dispatch({ type: GET_PARENTS_SUCCESS, payload: res.data.parents });
  } catch (err) {
    dispatch({
      type: GET_PARENTS_FAIL,
      payload: err.response?.data?.message || err.message,
    });
  }
};

export const deleteParentAPI = (id, token) => async (dispatch) => {
  dispatch({ type: DELETE_PARENT_REQUEST });
  try {
    await axios.delete(`${PARENT_API}/${id}/deleteParent`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    dispatch({ type: DELETE_PARENT_SUCCESS, payload: id });
  } catch (err) {
    dispatch({
      type: DELETE_PARENT_FAIL,
      payload: err.response?.data?.message || err.message,
    });
  }
};

export const updateParentAPI = (parentId, data, token) => async (dispatch) => {
  dispatch({ type: UPDATE_PARENT_REQUEST });
  try {
    const res = await axios.put(
      `${PARENT_API}/${parentId}/updateParent`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    dispatch({
      type: UPDATE_PARENT_SUCCESS,
      payload: res.data, // Adjust based on your API response structure
    });
    return res.data; // Return the response data for the component
  } catch (err) {
    const errorMessage = err.response?.data?.message || err.message;
    dispatch({
      type: UPDATE_PARENT_FAIL,
      payload: errorMessage,
    });
    throw new Error(errorMessage); // Throw error to be caught in component
  }
};

export const deleteChildAssociationAPI =
  (parentId, studentId, token) => async (dispatch) => {
    dispatch({ type: DELETE_PARENT_CHILD_REQUEST });
    try {
      await axios.delete(`${PARENT_API}/${parentId}/${studentId}/enfants`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      dispatch({
        type: DELETE_PARENT_CHILD_SUCCESS,
        payload: { studentId, parentId },
      });
    } catch (err) {
      dispatch({
        type: DELETE_PARENT_CHILD_FAIL,
        payload: err.response?.data?.message || err.message,
      });
    }
  };

export const addParentChildAPI =
  (parentId, studentIds, token) => async (dispatch) => {
    dispatch({ type: ADD_PARENT_CHILD_REQUEST });
    try {
      const res = await axios.post(
        `${PARENT_API}/${parentId}/enfants`, // plus de studentId dans l'URL
        { studentIds }, // on envoie un tableau dans le body
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      // Supposons que res.data.élèves contient la liste des élèves ajoutés
      dispatch({ type: ADD_PARENT_CHILD_SUCCESS, payload: res.data.élèves });
      return res.data;
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message;
      dispatch({
        type: ADD_PARENT_CHILD_FAIL,
        payload: errorMessage,
      });
      throw new Error(errorMessage);
    }
  };
