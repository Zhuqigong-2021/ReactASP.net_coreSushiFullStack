import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: false,
};

export const paymentStatusSlice = createSlice({
  name: "payment",
  initialState: initialState,
  reducers: {
    setPaymentStatus: (state, action) => {
      console.log(action.payload);
      state.status = action.payload;
    },
  },
});

export const { setPaymentStatus } = paymentStatusSlice.actions;
export const paymentStatusReducer = paymentStatusSlice.reducer;
