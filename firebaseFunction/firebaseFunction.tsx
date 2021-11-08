// import { getDatabase, push, remove, ref, onValue } from "firebase/database";
import firebase from "../configFirebase";

import { Recipe } from "../types";

export const writeFavData = (recipeSelected: Recipe) => {
  // const db = getDatabase();
  // const reference = ref(db, "favorite/");
  // push(reference, recipeSelected);
  firebase.database().ref("fav/").push(recipeSelected);
};

export const deleteFavData = (selectedRecipe: any) => {
  const itemDelete = firebase.database().ref("fav/" + selectedRecipe.id);
  itemDelete.remove();
  // const db = getDatabase();
  // const reference = ref(db, "favorite/");
  // onValue(reference, (snapshot) => {
  //   const data = snapshot.forEach((child) => {
  //     if (child.val().recipe_id === selectedRecipe.recipe_id) {
  //       remove(child.ref);
  //     }
  //   });
  // });
};
