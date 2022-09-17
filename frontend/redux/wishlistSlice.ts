import { createSlice } from "@reduxjs/toolkit"
import { IProduct } from "../types";

const initialState: IProduct[] = [];

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    add: (state, action) => {
      state.push(action.payload);
    },
    remove: (state, action) => {
      return state.filter((item) => item.id !== action.payload)
    }
  }
})

export const { add, remove } = wishlistSlice.actions;
export default wishlistSlice.reducer;
