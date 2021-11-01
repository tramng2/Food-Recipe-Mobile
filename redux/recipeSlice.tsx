import { createSlice } from "@reduxjs/toolkit";
import { Recipe } from "../types";

type RecipeState = {
  recipeDetail: Recipe;
};
const initialState: RecipeState = {
  recipeDetail: {
    title: "",
    publisher: "",
    source_url: "",
    recipe_id: "",
    image_url: "",
    social_rank: 0,
    publisher_url: "",
    ingredients: [],
  },
};
export const recipeSlice = createSlice({
  name: "recipe",
  initialState,
  reducers: {
    getRecipe(state, action) {},
    setRecipe: (state, action) => {
      state.recipeDetail = action.payload;
    },
  },
});

export const { setRecipe, getRecipe } = recipeSlice.actions;
