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

const initialState = {
  loading: false,
  emplois: [],
  error: null,
  success: false, // pour détecter si un ajout a réussi
};

const emploiReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_EMPLOIS_REQUEST:
    case ADD_EMPLOI_REQUEST:
    case DELETE_EMPLOI_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
        success: false,
      };

    case GET_EMPLOIS_SUCCESS:
      return {
        ...state,
        loading: false,
        emplois: action.payload,
      };

    case ADD_EMPLOI_SUCCESS:
      return {
        ...state,
        loading: false,
        emplois: [...state.emplois, action.payload],
        success: true,
      };

    case DELETE_EMPLOI_SUCCESS:
      return {
        ...state,
        loading: false,
        emplois: state.emplois.filter((e) => e._id !== action.payload),
      };

    case GET_EMPLOIS_FAIL:
    case ADD_EMPLOI_FAIL:
    case DELETE_EMPLOI_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
        success: false,
      };

    default:
      return state;
  }
};

export default emploiReducer;
