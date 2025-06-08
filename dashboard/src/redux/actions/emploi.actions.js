import axios from "axios";
import {
  GET_EMPLOIS_REQUEST,
  GET_EMPLOIS_SUCCESS,
  GET_EMPLOIS_FAIL,
  ADD_EMPLOI_REQUEST,
  ADD_EMPLOI_SUCCESS,
  ADD_EMPLOI_FAIL,
  DELETE_EMPLOI_REQUEST,
  DELETE_EMPLOI_SUCCESS,
  DELETE_EMPLOI_FAIL,
} from "../constants/emploi.constants";
import { EMPLOI_API } from "../utils/api";
export const getAllEmploisAPI = () => async (dispatch) => {
  dispatch({ type: GET_EMPLOIS_REQUEST });

  try {
    const token = localStorage.getItem("token");
    const { data } = await axios.get(`${EMPLOI_API}/getEmplois`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch({ type: GET_EMPLOIS_SUCCESS, payload: data });
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message;
    dispatch({ type: GET_EMPLOIS_FAIL, payload: errorMessage });
  }
};

export const addEmploiAPI = (formData) => async (dispatch) => {
  dispatch({ type: ADD_EMPLOI_REQUEST });

  try {
    const token = localStorage.getItem("token");

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await axios.post(
      `${EMPLOI_API}/addEmploi`,
      formData,
      config
    );

    dispatch({ type: ADD_EMPLOI_SUCCESS, payload: response.data });
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message;
    dispatch({ type: ADD_EMPLOI_FAIL, payload: errorMessage });
  }
};

export const deleteEmploiAPI = (id) => async (dispatch) => {
  dispatch({ type: DELETE_EMPLOI_REQUEST });

  try {
    const token = localStorage.getItem("token");

    await axios.delete(`${EMPLOI_API}/deleteEmploi/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    dispatch({ type: DELETE_EMPLOI_SUCCESS, payload: id });
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message;
    dispatch({ type: DELETE_EMPLOI_FAIL, payload: errorMessage });
  }
};
