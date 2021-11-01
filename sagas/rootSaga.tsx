import { PayloadAction } from "@reduxjs/toolkit";
import { takeEvery, call, put } from "redux-saga/effects";
import { getRecipes, setRecipes } from "../redux/recipesSlice";
import { getRecipe, setRecipe } from "../redux/recipeSlice";
import { requestGetRecipes } from "./requestRecipes";
import { requestGetRecipe } from "./requestRecipe";
import { Alert } from "react-native";

interface ResponseGenerator {
  config?: any;
  data?: any;
  headers?: any;
  request?: any;
  status?: number;
  statusText?: string;
}

export function* watcherSaga() {
  yield takeEvery(getRecipes.type, function* (action: PayloadAction<string>) {
    try {
      const input = action.payload;
      const response: ResponseGenerator = yield call(requestGetRecipes, input);
      const { data } = response;
      yield put(setRecipes(data));
    } catch (error) {
      Alert.alert("Error", `${error}`, [
        {
          text: "Try again",
          onPress: () => {},
        },
      ]);
    }
  });
  yield takeEvery(getRecipe.type, function* (action: PayloadAction<string>) {
    try {
      const code = action.payload;
      const response: ResponseGenerator = yield call(requestGetRecipe, code);
      const { data } = response;
      yield put(setRecipe(data));
    } catch (error) {
      Alert.alert("Error", `${error}`, [
        {
          text: "Try again",
          onPress: () => {},
        },
      ]);
    }
  });
}
