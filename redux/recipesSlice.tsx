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
    // addFavRecipes: (state, action: PayloadAction<string>) => {
    //   console.log(state);
    //   // state.favRecipes = [...state.favRecipes, action.payload];
    // },
    // removeFavRecipes: (state, action: PayloadAction<string>) => {
    //   console.log(state);

    //   // const listFavRecipes = state.favRecipes.filter(
    //   //   (recipe) => recipe !== action.payload
    //   // );
    //   // state.favRecipes = listFavRecipes;
    // },
  },
});

export const { getRecipes, setRecipes } = recipesSlice.actions;
export const recipesList = (state: RootState) => state.recipes.recipesList;
