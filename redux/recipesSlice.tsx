import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Recipe, Recipes } from "../types";
import type { RootState } from "../store/store";

type RecipeState = {
  favRecipes: Recipes[];
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
    addFavRecipes: (state, action: PayloadAction<any>) => {
      state.favRecipes = [...state.favRecipes, action.payload];
    },
    removeFavRecipes: (state, action: PayloadAction<Recipes>) => {
      const listFavRecipes = state.favRecipes.filter(
        (recipe) => recipe.recipe_id !== action.payload.recipe_id
      );
      state.favRecipes = listFavRecipes;
    },
  },
});

export const { getRecipes, setRecipes, addFavRecipes, removeFavRecipes } =
  recipesSlice.actions;
export const recipesList = (state: RootState) => state.recipes.recipesList;
