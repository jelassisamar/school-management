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

const initialState = {
  matieres: [],
  loading: false,
  error: null,
};

const matiereReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_MATIERES_REQUEST:
    case ADD_MATIERE_REQUEST:
    case DELETE_MATIERE_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case GET_MATIERES_SUCCESS:
      return {
        ...state,
        loading: false,
        matieres: action.payload,
      };

    case ADD_MATIERE_SUCCESS:
      return {
        ...state,
        loading: false,
        matieres: [...state.matieres, action.payload],
      };

    case DELETE_MATIERE_SUCCESS:
      return {
        ...state,
        loading: false,
        matieres: state.matieres.filter((m) => m._id !== action.payload),
      };

    case GET_MATIERES_FAIL:
    case ADD_MATIERE_FAIL:
    case DELETE_MATIERE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default matiereReducer;
