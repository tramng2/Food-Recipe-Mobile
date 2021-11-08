import firebase from "../configFirebase";
import { Recipe } from "../types";

export const writeFavData = (recipeSelected: Recipe) => {
  firebase.database().ref("fav/").push(recipeSelected);
};

export const deleteFavData = (selectedRecipe: any) => {
  const itemDelete = firebase.database().ref("fav/" + selectedRecipe.id);
  itemDelete.remove();
};
