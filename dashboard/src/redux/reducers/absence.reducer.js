import {
  GET_ABSENCES_ELEVE_REQUEST,
  GET_ABSENCES_ELEVE_SUCCESS,
  GET_ABSENCES_ELEVE_FAIL,
  ADD_ABSENCE_REQUEST,
  ADD_ABSENCE_SUCCESS,
  ADD_ABSENCE_FAIL,
} from "../constants/absence.constants";

const initialState = {
  absencesParMatiere: [],
  loading: false,
  error: null,
  loadingMatieres: {},
};

export const absenceReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ABSENCES_ELEVE_REQUEST:
      return {
        ...state,
        loading: true,
        loadingMatieres: {
          ...state.loadingMatieres,
          [action.meta.matiereId]: true,
        },
        error: null,
      };

    case GET_ABSENCES_ELEVE_SUCCESS:
      return {
        ...state,
        loading: false,
        loadingMatieres: {
          ...state.loadingMatieres,
          [action.payload.matiereId]: false,
        },
        absencesParMatiere: [
          ...state.absencesParMatiere.filter(
            (a) => a.matiereId !== action.payload.matiereId
          ),
          action.payload,
        ],
        error: null,
      };

    case ADD_ABSENCE_SUCCESS:
      return {
        ...state,
        loading: false,
        absencesParMatiere: state.absencesParMatiere.map((absence) =>
          absence.matiereId === action.payload.matiereId
            ? { ...absence, duree: absence.duree + action.payload.duree }
            : absence
        ),
      };

    case GET_ABSENCES_ELEVE_FAIL:
    case ADD_ABSENCE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
        loadingMatieres: {
          ...state.loadingMatieres,
          [action.meta?.matiereId]: false,
        },
      };

    default:
      return state;
  }
};
