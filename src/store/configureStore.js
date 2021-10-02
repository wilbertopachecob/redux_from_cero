// import { createStore } from "redux";
// import createStore from "./customStore";
import reducer from "./reducer.js";
import { configureStore } from "@reduxjs/toolkit";
import logger from "./middleware/logger";
import func from "./middleware/func";

export default function () {
  const store = configureStore({
    reducer,
    middleware: [logger("info"), func],
  });
  return store;
}
