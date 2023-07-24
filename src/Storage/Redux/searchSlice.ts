import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  search: "",
};

export const searchSlice = createSlice({
  name: "search",
  initialState: initialState,
  reducers: {
    setSearchItem: (state, action) => {
      state.search = action.payload;
    },
  },
});

export const { setSearchItem } = searchSlice.actions;
export const searchReducer = searchSlice.reducer;
