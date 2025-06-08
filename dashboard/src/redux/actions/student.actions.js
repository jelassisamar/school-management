import axios from "axios";
import {
  STUDENT_INFO_REQUEST,
  STUDENT_INFO_SUCCESS,
  STUDENT_INFO_FAIL,
  GET_STUDENTS_REQUEST,
  GET_STUDENTS_SUCCESS,
  GET_STUDENTS_FAIL,
  ADD_STUDENT_REQUEST,
  ADD_STUDENT_SUCCESS,
  ADD_STUDENT_FAIL,
  DELETE_STUDENT_REQUEST,
  DELETE_STUDENT_SUCCESS,
  DELETE_STUDENT_FAIL,
  UPDATE_STUDENT_REQUEST,
  UPDATE_STUDENT_SUCCESS,
  UPDATE_STUDENT_FAIL,
} from "../constants/student.constants";
import { STUDENT_API } from "../utils/api";
export const fetchStudentInfo = (studentId) => async (dispatch) => {
  dispatch({ type: STUDENT_INFO_REQUEST });
  try {
    const { data } = await axios.get(`${STUDENT_API}/${studentId}`);
    console.log("Received data:", data);

    // No need to check data.success
    dispatch({
      type: STUDENT_INFO_SUCCESS,
      payload: data, // pass the actual data
    });
  } catch (error) {
    console.error("Error:", error);
    dispatch({
      type: STUDENT_INFO_FAIL,
      payload: error.response?.data?.message || error.message,
    });
  }
};

export const ajouterEleveAPI = (data, token) => async (dispatch) => {
  try {
    dispatch({ type: ADD_STUDENT_REQUEST });

    const res = await axios.post(`${STUDENT_API}/student`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    dispatch({ type: ADD_STUDENT_SUCCESS, payload: res.data });
  } catch (err) {
    if (err.response && err.response.status === 409) {
      throw new Error("Login utilisé");
    }
    dispatch({
      type: ADD_STUDENT_FAIL,
      payload: err.response?.data?.message || err.message,
    });
  }
};

export const getStudentsAPI = (token) => async (dispatch) => {
  try {
    dispatch({ type: GET_STUDENTS_REQUEST });

    const res = await axios.get(`${STUDENT_API}/getstudents`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    dispatch({ type: GET_STUDENTS_SUCCESS, payload: res.data.students });
  } catch (err) {
    dispatch({
      type: GET_STUDENTS_FAIL,
      payload: err.response?.data?.message || err.message,
    });
  }
};

export const deleteStudentAPI = (id, token) => {
  return async (dispatch) => {
    try {
      dispatch({ type: DELETE_STUDENT_REQUEST });
      await axios.delete(`${STUDENT_API}/${id}/delete`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      dispatch({ type: DELETE_STUDENT_SUCCESS, payload: id });
    } catch (err) {
      dispatch({
        type: DELETE_STUDENT_FAIL,
        payload: err.response?.data?.message || err.message,
      });
    }
  };
};

export const updateStudentAPI = (studentId, data, token) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_STUDENT_REQUEST });

    const res = await axios.put(`${STUDENT_API}/${studentId}/update`, data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    

    dispatch({
      type: UPDATE_STUDENT_SUCCESS,
      payload: res.data.student,
    });
  } catch (err) {
    dispatch({
      type: UPDATE_STUDENT_FAIL,
      payload: err.response?.data?.message || err.message,
    });
  }
};
