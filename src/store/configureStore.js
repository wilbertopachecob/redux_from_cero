// import { createStore } from "redux";
// import createStore from "./customStore";
import reducer from "./reducer.js";
import { configureStore } from "@reduxjs/toolkit";
import logger from "./middleware/logger";


export default function () {
  const store = configureStore({
    reducer,
    middleware: [logger('info')],
  });
  return store;  
};
