import { createSlice } from "@reduxjs/toolkit";
import { shoppingCartModel } from "../../interfaces";

const initialState: shoppingCartModel = {
  cartItems: [],
};

export const shoppingCartSlice = createSlice({
  name: "cartItems",
  initialState: initialState,
  reducers: {
    setShoppingCart: (state, action) => {
      state.cartItems = action.payload;
    },
    updateQuantity: (state, action) => {
      //payload - cart item that needs to be updated, newquantity
      state.cartItems = state.cartItems?.map((item) => {
        if (item.id === action.payload.cartItem.id) {
          item.quantity = action.payload.quantity;
        }
        return item;
      });
    },
    removeFromCart: (state, action) => {
      //payload - cart item that needs to be updated, newquantity
      state.cartItems = state.cartItems?.filter((item) => {
        if (item.id === action.payload.cartItem.id) {
          return null;
        }
        return item;
      });
    },

    emptyCart: (state) => {
      state.cartItems = [];
    },
  },
});

export const {
  setShoppingCart,
  updateQuantity,
  removeFromCart,
  emptyCart,
} = shoppingCartSlice.actions;
export const shoppingCartReducer = shoppingCartSlice.reducer;
