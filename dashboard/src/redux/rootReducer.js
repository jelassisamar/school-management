import { combineReducers } from "redux";
import authReducer from "./reducers/auth.reducer";
import parentReducer from "./reducers/parent.reducer";
import classeReducer from "./reducers/classe.reducer";
import studentReducer from "./reducers/student.reducer";
import emploiReducer from "./reducers/emploi.reducer";
import matiereReducer from "./reducers/matiere.reducer";
import { absenceReducer } from "./reducers/absence.reducer";
const rootReducer = combineReducers({
  auth: authReducer,
  parent: parentReducer,
  student: studentReducer,
  classe: classeReducer,
  emploi: emploiReducer,
  matiere: matiereReducer,
  absence: absenceReducer,
});

export default rootReducer;
