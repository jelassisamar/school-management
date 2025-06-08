import { createSlice } from "@reduxjs/toolkit";
import { fetchParentWithChildren } from "../actions/parent.actions";

const initialState = {
  parentData: null,
  loading: false,
  error: null,
};

const parentSlice = createSlice({
  name: "parent",
  initialState,
  reducers: {
    clearParentData: (state) => {
      state.parentData = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchParentWithChildren.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchParentWithChildren.fulfilled, (state, action) => {
        state.loading = false;
        state.parentData = action.payload;
      })
      .addCase(fetchParentWithChildren.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearParentData } = parentSlice.actions;
export default parentSlice.reducer;
