import axios from "axios";
import { ABSENCE_API } from "../utils/api";
import {
  GET_ABSENCES_REQUEST,
  GET_ABSENCES_SUCCESS,
  GET_ABSENCES_FAIL,
  GET_ABSENCES_ELEVE_REQUEST,
  GET_ABSENCES_ELEVE_SUCCESS,
  GET_ABSENCES_ELEVE_FAIL,
  ADD_ABSENCE_REQUEST,
  ADD_ABSENCE_SUCCESS,
  ADD_ABSENCE_FAIL,
  DELETE_ABSENCE_REQUEST,
  DELETE_ABSENCE_SUCCESS,
  DELETE_ABSENCE_FAIL,
} from "../constants/absence.constants";

// Toutes les absences
export const getAllAbsences = (token) => async (dispatch) => {
  try {
    dispatch({ type: GET_ABSENCES_REQUEST });

    const { data } = await axios.get(`${ABSENCE_API}/getabsences`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    dispatch({ type: GET_ABSENCES_SUCCESS, payload: data.absences });
  } catch (error) {
    dispatch({
      type: GET_ABSENCES_FAIL,
      payload: error.response?.data?.message || error.message,
    });
  }
};
export const getAbsencesParMatiereEleveAPI =
  (eleveId, matiereId, token) => async (dispatch) => {
    try {
      dispatch({ type: GET_ABSENCES_ELEVE_REQUEST });

      const { data } = await axios.get(
        `${ABSENCE_API}/${eleveId}/${matiereId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      dispatch({
        type: GET_ABSENCES_ELEVE_SUCCESS,
        payload: {
          matiereId: data.absence.matiereId,
          nomMatiere: data.absence.nomMatiere,
          ideleve: eleveId,
          duree: data.absence.duree,
        },
      });
      return { payload: { absence: data } };
    } catch (error) {
      dispatch({
        type: GET_ABSENCES_ELEVE_FAIL,
        payload: error.response?.data?.message || error.message,
      });
    }
  };

// Ajouter une absence
export const ajouterAbsence = (absenceData, token) => async (dispatch) => {
  try {
    dispatch({ type: ADD_ABSENCE_REQUEST });

    const { data } = await axios.post(
      `${ABSENCE_API}/addabsence`,
      absenceData,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    dispatch({ type: ADD_ABSENCE_SUCCESS, payload: data.absence });
  } catch (error) {
    dispatch({
      type: ADD_ABSENCE_FAIL,
      payload: error.response?.data?.message || error.message,
    });
  }
};

// Supprimer une absence
export const supprimerAbsence = (absenceId, token) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_ABSENCE_REQUEST });

    await axios.delete(`${ABSENCE_API}/deleteabsence/${absenceId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    dispatch({ type: DELETE_ABSENCE_SUCCESS, payload: absenceId });
  } catch (error) {
    dispatch({
      type: DELETE_ABSENCE_FAIL,
      payload: error.response?.data?.message || error.message,
    });
  }
};
