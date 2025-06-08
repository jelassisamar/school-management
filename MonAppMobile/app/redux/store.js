import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/auth.slices";
import parentReducer from "./slices/parent.slices";
import studentReducer from "./slices/student.slices";
import emploiReducer from "./slices/emploi.slices";
const store = configureStore({
  reducer: {
    auth: authReducer,
    parent: parentReducer,
    student: studentReducer,
    emploi: emploiReducer,
  },
});

export default store;
