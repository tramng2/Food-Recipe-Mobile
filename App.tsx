import { StatusBar } from "expo-status-bar";
import { Provider } from "react-redux";
import store from "./store/store";
import React from "react";

import { firebaseConfig } from "./configFirebase";
import { initializeApp } from "firebase/app";
import AllScreens from "./AllScreens";
const app = initializeApp(firebaseConfig);

export default function App() {
  return (
    <Provider store={store}>
      <AllScreens />
    </Provider>
  );
}
