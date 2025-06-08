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

const initialState = {
  classes: [],
  matieresParClasse: [],
  loading: false,
  error: null,
  success: false,
};

const classeReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CLASSE_REQUEST:
    case CREATE_CLASSE_REQUEST:
    case UPDATE_CLASSE_REQUEST:
    case DELETE_CLASSE_REQUEST:
    case GET_MATIERES_PAR_CLASSE_REQUEST:
      return { ...state, loading: true, error: null, success: false };
    case GET_MATIERES_PAR_CLASSE_SUCCESS:
      return {
        ...state,
        matieresParClasse: action.payload,
        loading: false,
        error: null,
      };
    case GET_CLASSE_SUCCESS:
      return {
        ...state,
        classes: action.payload,
        loading: false,
        error: null,
      };

    case CREATE_CLASSE_SUCCESS:
      return {
        ...state,
        classes: [...state.classes, action.payload],
        loading: false,
        error: null,
        success: true,
      };

    case UPDATE_CLASSE_SUCCESS:
      return {
        ...state,
        classes: state.classes.map((classe) =>
          classe._id === action.payload._id ? action.payload : classe
        ),
        loading: false,
        error: null,
        success: true,
      };

    case DELETE_CLASSE_SUCCESS:
      return {
        ...state,
        classes: state.classes.filter(
          (classe) => classe._id !== action.payload
        ),
        loading: false,
        error: null,
        success: true,
      };
    case GET_MATIERES_PAR_CLASSE_FAIL:
    case GET_CLASSE_FAIL:
    case CREATE_CLASSE_FAIL:
    case UPDATE_CLASSE_FAIL:
    case DELETE_CLASSE_FAIL:
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

export default classeReducer;
