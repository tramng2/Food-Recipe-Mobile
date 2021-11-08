import { StatusBar } from "expo-status-bar";
import { Provider } from "react-redux";
import store from "./store/store";
import React from "react";

import AllScreens from "./AllScreens";

export default function App() {
  return (
    <Provider store={store}>
      <AllScreens />
    </Provider>
  );
}
