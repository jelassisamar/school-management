import { createSlice } from "@reduxjs/toolkit";
import { fetchEmploiByClasseId } from "../actions/emploi.actions";

const emploiSlice = createSlice({
  name: "emploi",
  initialState: {
    emploi: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearEmploi: (state) => {
      state.emploi = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEmploiByClasseId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEmploiByClasseId.fulfilled, (state, action) => {
        state.loading = false;
        state.emploi = action.payload;
      })
      .addCase(fetchEmploiByClasseId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearEmploi } = emploiSlice.actions;
export default emploiSlice.reducer;
