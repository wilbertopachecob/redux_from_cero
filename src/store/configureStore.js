// import { createStore } from "redux";
// import createStore from "./customStore";
import reducer from "./reducer.js";
import { configureStore } from "@reduxjs/toolkit";
import logger from "./middleware/logger";
import toast from "./middleware/toast";
import api from "./middleware/api";
// import func from "./middleware/func";
//so redux/toolkit uses a middleware called thunk that does what our func middleware does, we just to pass it to the store config as a function,
//its included in the getDefaultMiddleware array

export default function () {
  const store = configureStore({
    reducer,
    // middleware: [logger("info"), func],
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(logger("info"), toast, api),
  });
  return store;
}
