import { combineReducers, configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { watcherSaga } from "../sagas/rootSaga";
import { recipesSlice } from "../redux/recipesSlice";
import { recipeSlice } from "../redux/recipeSlice";

const sagaMiddleware = createSagaMiddleware();

const reducer = combineReducers({
  recipes: recipesSlice.reducer,
  recipe: recipeSlice.reducer,
});

const store = configureStore({
  reducer,
  middleware: [sagaMiddleware],
});
sagaMiddleware.run(watcherSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
