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

const initialState = {
  loading: false,
  parents: [], // liste des parents
  enfants: [], // liste des enfants liés (à un parent donné)
  error: null,
};

export default function parentReducer(state = initialState, action) {
  switch (action.type) {
    // Actions qui déclenchent le loading
    case PARENT_CHILDREN_REQUEST:
    case GET_PARENTS_REQUEST:
    case ADD_PARENT_REQUEST:
    case DELETE_PARENT_REQUEST:
    case UPDATE_PARENT_REQUEST:
    case DELETE_PARENT_CHILD_REQUEST:
    case ADD_PARENT_CHILD_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    // Chargement des enfants liés à un parent réussi
    case PARENT_CHILDREN_SUCCESS:
      return {
        ...state,
        loading: false,
        enfants: action.payload,
      };

    // Chargement de la liste des parents réussi
    case GET_PARENTS_SUCCESS:
      return {
        ...state,
        loading: false,
        parents: action.payload,
      };

    // Ajout d’un parent réussi
    case ADD_PARENT_SUCCESS:
      return {
        ...state,
        loading: false,
        parents: [...state.parents, action.payload],
      };

    // Suppression d’un parent réussi
    case DELETE_PARENT_SUCCESS:
      return {
        ...state,
        loading: false,
        parents: state.parents.filter((p) => p._id !== action.payload),
      };

    // Mise à jour d’un parent réussi
    case UPDATE_PARENT_SUCCESS:
      return {
        ...state,
        loading: false,
        parents: state.parents.map((parent) =>
          parent._id === action.payload._id ? action.payload : parent
        ),
      };

    // Suppression d’une association enfant-parent réussi
    case DELETE_PARENT_CHILD_SUCCESS:
      return {
        ...state,
        loading: false,
        enfants: state.enfants.filter(
          (enf) => enf._id !== action.payload.studentId
        ),
      };

    // Ajout d’une association enfant-parent réussi
    case ADD_PARENT_CHILD_SUCCESS:
      return {
        ...state,
        loading: false,
        enfants: [...state.enfants, action.payload],
      };

    // Gestion des erreurs
    case PARENT_CHILDREN_FAIL:
    case GET_PARENTS_FAIL:
    case ADD_PARENT_FAIL:
    case DELETE_PARENT_FAIL:
    case UPDATE_PARENT_FAIL:
    case DELETE_PARENT_CHILD_FAIL:
    case ADD_PARENT_CHILD_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    // Default state
    default:
      return state;
  }
}
