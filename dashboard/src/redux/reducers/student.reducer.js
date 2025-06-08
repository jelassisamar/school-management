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

const initialState = {
  loading: false,
  students: [],
  student: null,
  error: null,
};

export default function studentReducer(state = initialState, action) {
  switch (action.type) {
    case GET_STUDENTS_REQUEST:
      return { ...state, loading: true };
    case GET_STUDENTS_SUCCESS:
      return { ...state, loading: false, students: action.payload };
    case GET_STUDENTS_FAIL:
      return { ...state, loading: false, error: action.payload };

    case ADD_STUDENT_REQUEST:
      return { ...state, loading: true };
    case ADD_STUDENT_SUCCESS:
      return { ...state, loading: false, student: action.payload };
    case ADD_STUDENT_FAIL:
      return { ...state, loading: false, error: action.payload };

    case DELETE_STUDENT_REQUEST:
      return { ...state, loading: true };
    case DELETE_STUDENT_SUCCESS:
      return { ...state, loading: false, student: action.payload };
    case DELETE_STUDENT_FAIL:
      return { ...state, loading: false, error: action.payload };

    case STUDENT_INFO_REQUEST:
      return { ...state, loading: true, error: null };
    case STUDENT_INFO_SUCCESS:
      return { ...state, loading: false, student: action.payload };
    case STUDENT_INFO_FAIL:
      return { ...state, loading: false, error: action.payload };
    

      case UPDATE_STUDENT_REQUEST:
  return { ...state, loading: true };

case UPDATE_STUDENT_SUCCESS:
  return {
    ...state,
    loading: false,
    student: action.payload,
    students: state.students.map((s) =>
      s._id === action.payload._id ? action.payload : s
    ), 
  };

case UPDATE_STUDENT_FAIL:
  return { ...state, loading: false, error: action.payload };

      default:
      return state;
  }
}
