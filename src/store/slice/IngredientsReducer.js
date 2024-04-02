// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import productsApi from "../../api/products";

// export const fetchIngredients = createAsyncThunk(
//   "/food/fetchProducts",
//   async () => {
//     const data = await ingredientsApi.getProducts();
//     return data;
//   }
// );

// const ingredientsSlice = createSlice({
//   name: "ingredients",
//   initialState: {
//     productsData: null,
//   },
//   extraReducers: (builder) => {
//     builder.addCase(fetchIngredients.fulfilled, (state, action) => {
//       state.productsData = action.payload;
//     });
//   },
// });
// export const productsReducer = ingredientsSlice.reducer;
