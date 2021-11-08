import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Recipe, Recipes } from "../types";
import type { RootState } from "../store/store";

type RecipeState = {
  favRecipes: Recipe[];
  recipesList: Recipes[];
};

const initialState: RecipeState = {
  favRecipes: [],
  recipesList: [],
};
export const recipesSlice = createSlice({
  name: "recipes",
  initialState,
  reducers: {
    getRecipes(state, action) {},
    setRecipes: (state, action) => {
      state.recipesList = action.payload.recipes;
    },
    favInit: (state, action) => {
      state.favRecipes = action.payload;
    },
  },
});

export const { getRecipes, setRecipes, favInit } = recipesSlice.actions;
export const recipesList = (state: RootState) => state.recipes.recipesList;
